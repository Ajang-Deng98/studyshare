from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='resource',
            name='download_count',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddIndex(
            model_name='resource',
            index=models.Index(fields=['subject'], name='api_resource_subject_idx'),
        ),
        migrations.AddIndex(
            model_name='resource',
            index=models.Index(fields=['topic'], name='api_resource_topic_idx'),
        ),
        migrations.AddIndex(
            model_name='resource',
            index=models.Index(fields=['course_code'], name='api_resource_course_code_idx'),
        ),
        migrations.AddIndex(
            model_name='resource',
            index=models.Index(fields=['upload_date'], name='api_resource_upload_date_idx'),
        ),
    ]