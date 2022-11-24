from rest_framework import serializers
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import Article, Profile, Like

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    article = ArticleSerializer(read_only=True, many=True)
    class Meta:
        model = Profile
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'
            
class RegisterSerializer(serializers.ModelSerializer):
    last_name = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(write_only=True, required=True)
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())],
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password],
                                     style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ('id', 'last_name', 'first_name', 'email', 'username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "兩次密碼輸入不同"})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            last_name = validated_data['last_name'],
            first_name = validated_data['first_name'],
            email = validated_data['email'],
            username = validated_data['username'],
            password = validated_data['password'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


def UserSignal(sender, instance, created, **kwargs):
    if created:
        Token.objects.create(user=instance)
        Profile.objects.create(
            user = instance,
            username = instance.username,
            first_name = instance.first_name, 
            last_name = instance.last_name,
            email = instance.email
                )
post_save.connect(UserSignal, sender=User)
        