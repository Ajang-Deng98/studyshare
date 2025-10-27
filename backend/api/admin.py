from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Resource, Tag, Rating, Comment

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'name', 'email', 'university_name', 'role', 'date_joined']
    list_filter = ['role', 'university_name']
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('name', 'university_name', 'role')}),
    )

@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ['title', 'uploader', 'subject', 'topic', 'upload_date']
    list_filter = ['subject', 'topic', 'upload_date']
    search_fields = ['title', 'description']

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ['resource', 'user', 'rating_value']

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['resource', 'user', 'created_at']
    list_filter = ['created_at']