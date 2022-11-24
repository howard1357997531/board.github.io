from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'articles',views.ArticleViewSet,basename='articles')
router.register(r'profile',views.ProfileViewSet,basename='profile') 

urlpatterns = [
    path('', views.frontend, name='frontend'),
    path('api/',include(router.urls)),
    path('api/api-token-auth/', views.CustomAuthToken.as_view()),
    path('api/articleList/', views.GetArticleList.as_view()), 
    path('api/register/', views.RegisterList.as_view()),
    path('api/like/', views.LikeList.as_view()),
    path('api/like/<int:pk>/', views.LikeDetail.as_view()),
]