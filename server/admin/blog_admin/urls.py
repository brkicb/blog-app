from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    AuthorListAPIView,
    AuthorModelViewSet,
    BlogPostModelViewSet
)


router = DefaultRouter()
router.register('author', AuthorModelViewSet)
router.register('posts', BlogPostModelViewSet)

urlpatterns = [
    path('authors/', AuthorListAPIView.as_view()),
]

urlpatterns += router.urls
