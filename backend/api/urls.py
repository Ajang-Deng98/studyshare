from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('users/', views.UserProfileView.as_view(), name='user-profile'),
    path('resources/', views.ResourceListCreateView.as_view(), name='resource-list'),
    path('resources/<int:pk>/', views.ResourceDetailView.as_view(), name='resource-detail'),
    path('resources/<int:resource_id>/ratings/', views.RatingListCreateView.as_view(), name='resource-ratings'),
    path('resources/<int:resource_id>/comments/', views.CommentListCreateView.as_view(), name='resource-comments'),
    path('resources/<int:resource_id>/download/', views.download_resource, name='download-resource'),
    path('tags/', views.TagListView.as_view(), name='tag-list'),
    path('search/', views.search_resources, name='search-resources'),
]