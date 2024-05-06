from django.urls import path
from .views import (
    BlogPostListAPIView,
    BlogPostRetrieveAPIView
)

urlpatterns = [
    path('posts/', BlogPostListAPIView.as_view()),
    path('posts/<slug:slug>/', BlogPostRetrieveAPIView.as_view()),
]
