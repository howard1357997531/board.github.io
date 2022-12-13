from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'articles',views.ArticleViewSet,basename='articles')
router.register(r'profile',views.ProfileViewSet,basename='profile') 
router.register(r'save_article',views.SaveArticle,basename='save_article') 

urlpatterns = [
    path('api/',include(router.urls)),
    path('api/api-token-auth/', views.CustomAuthToken.as_view()),
    path('api/articleList/', views.GetArticleList.as_view()), 
    path('api/register/', views.RegisterList.as_view()),
    path('api/like/', views.LikeList.as_view()),
    path('api/like/<int:pk>/', views.LikeDetail.as_view()),
    path('api/comment/', views.CommentGenericView.as_view()),

    path('', views.frontend, name='frontend'),
    path('login/', views.frontend, name='frontend'),
    path('register/', views.frontend, name='frontend'),
    path('create_article/', views.frontend, name='frontend'),
    path('profile/', views.frontend, name='frontend'),
    path('myarticle/', views.frontend, name='frontend'),
    path('my-save-article/', views.frontend, name='my-save-article'),
]