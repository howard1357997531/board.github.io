from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import (ArticleSerializer, ProfileSerializer, LikeSerializer, CommentSerializer,
                        Save_articleSerializer, RegisterSerializer)
from .models import Article, Profile, Like, Comment, Save_article
from . import models
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import generics, mixins, status


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'user_name': user.username,
        })

class RegisterList(mixins.CreateModelMixin, generics.GenericAPIView):
    queryset =User.objects.all()
    serializer_class = RegisterSerializer
    authentication_classes = (TokenAuthentication,)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = (TokenAuthentication,)
    
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = (TokenAuthentication,)
    
class GetArticleList(APIView):
    premission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]

    def get(self, request, format=None):
        articles = Article.objects.all().order_by('-created_at')
        output = []
        if request.user.is_authenticated:
            for article in articles: 
                like_id = Like.objects.filter(user=request.user.profile, article=article.id)
                if Comment.objects.filter(article__id=article.id).exists() :
                    comment = list(Comment.objects.filter(article__id=article.id).order_by('-created_at').values())
                    for com in comment:
                        username = Profile.objects.get(id=com['user_id']).username
                        first_name = Profile.objects.get(id=com['user_id']).first_name
                        last_name = Profile.objects.get(id=com['user_id']).last_name
                        com.update({'username': username})
                        com.update({'first_name': first_name})
                        com.update({'last_name': last_name})
                        com.update({'created_at': com['created_at'].strftime('%Y/%m/%d %H:%M:%S')})
                else:
                    comment = ""
                article_is_saved = Save_article.objects.filter(user=request.user.profile, article=article.id).exists()
                saved_article_id = Save_article.objects.filter(user=request.user.profile, article=article.id)
                temp_output = {
                    'user_id': article.user.id,
                    'article_id': article.id,
                    'username': article.user.username,
                    'last_name': article.user.last_name,
                    'first_name': article.user.first_name,
                    'title':  article.title,
                    'description':  article.description,
                    'likes':  article.likes,
                    'created_at':  article.created_at.strftime('%Y/%m/%d %H:%M:%S'),
                    'user_is_liked':  Like.objects.filter(user=request.user.profile, article=article.id).exists(),
                    'user_is_saved':  article_is_saved,
                    'user_likeId_for_thisArticle':  like_id.first().id if like_id.first() else "",
                    'user_saveId_for_thisArticle': saved_article_id.first().id if saved_article_id.first() else "",
                    'comment': comment
                    }
                output.append(temp_output)
        else:
            for article in articles: 
                if Comment.objects.filter(article__id=article.id).exists() :
                    comment = list(Comment.objects.filter(article__id=article.id).order_by('-created_at').values())
                    for com in comment:
                        username = Profile.objects.get(id=com['user_id']).username
                        first_name = Profile.objects.get(id=com['user_id']).first_name
                        last_name = Profile.objects.get(id=com['user_id']).last_name
                        com.update({'username': username})
                        com.update({'first_name': first_name})
                        com.update({'last_name': last_name})
                        com.update({'created_at': com['created_at'].strftime('%Y/%m/%d %H:%M:%S')})
                else:
                    comment = ""
                temp_output = {
                    'user_id': article.user.id,
                    'article_id': article.id,
                    'username': article.user.username,
                    'last_name': article.user.last_name,
                    'first_name': article.user.first_name,
                    'title':  article.title,
                    'description':  article.description,
                    'likes':  article.likes,
                    'created_at':  article.created_at.strftime('%Y/%m/%d %H:%M:%S'),
                    'comment': comment
                    }
                output.append(temp_output)
        return Response(output)

class LikeList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    premission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = (TokenAuthentication,)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        article = Article.objects.get(id=request.data.get('article'))
        like = Like.objects.filter(user=request.user.profile, article=request.data.get('article')).exists()
        if not like:
            article.likes += 1
        article.save()
        return self.create(request, *args, **kwargs)

class LikeDetail(mixins.RetrieveModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    premission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = (TokenAuthentication,)
    lookup_field = "pk"

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        article = Article.objects.get(id=request.data.get('article'))
        like = Like.objects.filter(user=request.user.profile, article=request.data.get('article')).exists()
        if like:
            article.likes -= 1
        article.save()
        return self.destroy(request, *args, **kwargs)

class CommentGenericView(generics.GenericAPIView, mixins.CreateModelMixin):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    premission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    

class SaveArticle(viewsets.ModelViewSet):
    queryset = Save_article.objects.all().order_by('-id')
    serializer_class = Save_articleSerializer

def frontend(request):
    return render(request, 'frontend/index.html', locals())

def not_found_404(request, exception):
    return render(request, 'frontend/not_found_404.html')
