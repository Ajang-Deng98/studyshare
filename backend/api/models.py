from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from .validators import validate_file_size, validate_file_extension

class User(AbstractUser):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('teacher', 'Teacher'),
    ]
    
    name = models.CharField(max_length=100)
    university_name = models.CharField(max_length=200)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')
    date_joined = models.DateTimeField(auto_now_add=True)

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.name

class Resource(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    file = models.FileField(
        upload_to='resources/',
        validators=[validate_file_size, validate_file_extension]
    )
    uploader = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resources')
    subject = models.CharField(max_length=100)
    topic = models.CharField(max_length=100)
    course_code = models.CharField(max_length=20)
    tags = models.ManyToManyField(Tag, blank=True)
    upload_date = models.DateTimeField(auto_now_add=True)
    download_count = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['-upload_date']
        indexes = [
            models.Index(fields=['subject']),
            models.Index(fields=['topic']),
            models.Index(fields=['course_code']),
            models.Index(fields=['upload_date']),
        ]
    
    def __str__(self):
        return self.title
    
    @property
    def average_rating(self):
        ratings = self.ratings.all()
        if ratings:
            return sum(r.rating_value for r in ratings) / len(ratings)
        return 0

class Rating(models.Model):
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating_value = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    
    class Meta:
        unique_together = ('resource', 'user')

class Comment(models.Model):
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'Comment by {self.user.username} on {self.resource.title}'