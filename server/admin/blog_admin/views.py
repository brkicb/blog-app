from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import OrderingFilter
from rest_framework import permissions
from blog.models import Author, BlogPost
from .serializers import AuthorSerializer, BlogPostSerializer


class AuthorListAPIView(ListAPIView):
    queryset = Author.objects.order_by('-date_created').all()
    serializer_class = AuthorSerializer
    pagination_class = None


class AuthorModelViewSet(ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    filter_backends = [OrderingFilter]
    ordering_fields = ['date_created']


class BlogPostModelViewSet(ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    filter_backends = [OrderingFilter]
    ordering_fields = ['date_created']
    lookup_field = 'slug'
