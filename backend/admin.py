from django.contrib import admin
from .models import Profile, Article, Like
from rest_framework.authtoken.admin import TokenAdmin

TokenAdmin.raw_id_fields = ['user']


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id','user')


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'title', 'description', 'created_at')

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('user', 'article')
