from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True)
    username = models.CharField(max_length=120, null=True, blank=True)
    last_name = models.CharField(max_length=120, null=True, blank=True)
    first_name = models.CharField(max_length=120, null=True, blank=True)
    email = models.EmailField(max_length=120, null=True, blank=True)
    phone = models.CharField(max_length=120, null=True, blank=True)
    address = models.CharField(max_length=120, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user}'


class Article(models.Model):
    user = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='article', null=True, blank=True)
    title = models.CharField(max_length=120)
    description = models.TextField(max_length=600)
    likes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Like(models.Model):
    user = models.ForeignKey(Profile,on_delete=models.CASCADE)
    article = models.ForeignKey(Article,on_delete=models.CASCADE)
