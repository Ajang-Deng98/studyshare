from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Resource, Tag, Rating, Comment

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['name', 'university_name', 'email', 'password', 'role']
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.username = validated_data['email']
        user.set_password(password)
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        if email and password:
            user = authenticate(username=email, password=password)
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise serializers.ValidationError('User account is disabled.')
            else:
                raise serializers.ValidationError('Invalid credentials.')
        else:
            raise serializers.ValidationError('Must include email and password.')
        
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'university_name', 'email', 'role', 'date_joined']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class ResourceSerializer(serializers.ModelSerializer):
    uploader = UserSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    tag_names = serializers.ListField(child=serializers.CharField(), write_only=True, required=False)
    average_rating = serializers.ReadOnlyField()
    
    class Meta:
        model = Resource
        fields = ['id', 'title', 'description', 'file', 'uploader', 'subject', 
                 'topic', 'course_code', 'tags', 'tag_names', 'upload_date', 'average_rating']
    
    def create(self, validated_data):
        tag_names = validated_data.pop('tag_names', [])
        resource = Resource.objects.create(**validated_data)
        
        for tag_name in tag_names:
            tag, created = Tag.objects.get_or_create(name=tag_name.strip())
            resource.tags.add(tag)
        
        return resource

class RatingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Rating
        fields = ['id', 'resource', 'user', 'rating_value']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'resource', 'user', 'content', 'created_at']
        read_only_fields = ['resource', 'user', 'created_at']