from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q, F
from django_filters.rest_framework import DjangoFilterBackend
from django.http import HttpResponse, Http404
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
import os
from .models import User, Resource, Tag, Rating, Comment
from .serializers import (
    UserRegistrationSerializer, UserLoginSerializer, UserSerializer,
    ResourceSerializer, TagSerializer, RatingSerializer, CommentSerializer
)
from .permissions import IsOwnerOrReadOnly, IsCommentOwnerOrReadOnly

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout(request):
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message': 'Successfully logged out'})
    except Exception:
        return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user

class ResourceListCreateView(generics.ListCreateAPIView):
    queryset = Resource.objects.all().order_by('-upload_date')
    serializer_class = ResourceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['subject', 'topic', 'course_code', 'uploader']
    
    def perform_create(self, serializer):
        serializer.save(uploader=self.request.user)

class ResourceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [IsOwnerOrReadOnly]

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def download_resource(request, resource_id):
    resource = get_object_or_404(Resource, id=resource_id)
    
    if resource.file:
        file_path = resource.file.path
        if os.path.exists(file_path):
            # Increment download count
            Resource.objects.filter(id=resource_id).update(download_count=F('download_count') + 1)
            
            with open(file_path, 'rb') as fh:
                response = HttpResponse(fh.read(), content_type="application/octet-stream")
                response['Content-Disposition'] = f'attachment; filename="{os.path.basename(file_path)}"'
                return response
    
    raise Http404("File not found")

class TagListView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class RatingListCreateView(generics.ListCreateAPIView):
    serializer_class = RatingSerializer
    
    def get_queryset(self):
        return Rating.objects.filter(resource_id=self.kwargs['resource_id'])
    
    def create(self, request, *args, **kwargs):
        resource = Resource.objects.get(id=self.kwargs['resource_id'])
        rating_value = request.data.get('rating_value')
        
        # Update or create rating
        rating, created = Rating.objects.update_or_create(
            resource=resource,
            user=request.user,
            defaults={'rating_value': rating_value}
        )
        
        serializer = self.get_serializer(rating)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        return Comment.objects.filter(resource_id=self.kwargs['resource_id']).order_by('-created_at')
    
    def create(self, request, *args, **kwargs):
        try:
            resource = Resource.objects.get(id=self.kwargs['resource_id'])
        except Resource.DoesNotExist:
            return Response({'error': 'Resource not found'}, status=status.HTTP_404_NOT_FOUND)
            
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        comment = serializer.save(user=request.user, resource=resource)
        return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)

class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsCommentOwnerOrReadOnly]

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def search_resources(request):
    query = request.GET.get('query', '')
    subject = request.GET.get('subject', '')
    topic = request.GET.get('topic', '')
    uploader = request.GET.get('uploader', '')
    
    resources = Resource.objects.all()
    
    if query:
        resources = resources.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(subject__icontains=query) |
            Q(topic__icontains=query)
        )
    
    if subject:
        resources = resources.filter(subject__icontains=subject)
    
    if topic:
        resources = resources.filter(topic__icontains=topic)
    
    if uploader:
        resources = resources.filter(uploader__name__icontains=uploader)
    
    # Add pagination for large result sets
    from django.core.paginator import Paginator
    
    page_size = request.GET.get('page_size', 20)
    page = request.GET.get('page', 1)
    
    try:
        page_size = int(page_size)
        page = int(page)
    except ValueError:
        page_size = 20
        page = 1
    
    paginator = Paginator(resources, page_size)
    page_obj = paginator.get_page(page)
    
    serializer = ResourceSerializer(page_obj.object_list, many=True)
    
    return Response({
        'results': serializer.data,
        'count': paginator.count,
        'num_pages': paginator.num_pages,
        'current_page': page,
        'has_next': page_obj.has_next(),
        'has_previous': page_obj.has_previous()
    })