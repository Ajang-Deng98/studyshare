from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.html import format_html
from .models import User, Resource, Tag, Rating, Comment

# Custom admin site configuration
admin.site.site_header = 'StudyShare Administration'
admin.site.site_title = 'StudyShare Admin'
admin.site.index_title = 'Welcome to StudyShare Administration'

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'name', 'email', 'university_name', 'role', 'date_joined', 'is_active']
    list_filter = ['role', 'university_name', 'is_active', 'date_joined']
    search_fields = ['username', 'name', 'email', 'university_name']
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('name', 'university_name', 'role')}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Additional Info', {'fields': ('name', 'university_name', 'role')}),
    )

@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ['title', 'uploader', 'subject', 'topic', 'course_code', 'upload_date', 'download_count', 'average_rating']
    list_filter = ['subject', 'topic', 'course_code', 'upload_date', 'uploader__role']
    search_fields = ['title', 'description', 'subject', 'topic', 'course_code']
    readonly_fields = ['upload_date', 'download_count', 'average_rating']
    filter_horizontal = ['tags']
    date_hierarchy = 'upload_date'
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('uploader')

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'resource_count']
    search_fields = ['name']
    
    def resource_count(self, obj):
        return obj.resource_set.count()
    resource_count.short_description = 'Resources'

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ['resource', 'user', 'rating_value']
    list_filter = ['rating_value']
    search_fields = ['resource__title', 'user__username']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('resource', 'user')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['resource', 'user', 'content_preview', 'created_at']
    list_filter = ['created_at']
    search_fields = ['resource__title', 'user__username', 'content']
    readonly_fields = ['created_at']
    
    def content_preview(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content Preview'
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('resource', 'user')