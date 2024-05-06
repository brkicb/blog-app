from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView
)
from .models import BlogPost
from .serializers import BlogPostSerializer


class BlogPostListAPIView(ListAPIView):
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        queryset = BlogPost.objects.order_by('-date_created').filter(is_published=True)
        limit = self.request.query_params.get('limit')

        if limit is not None:
            try:
                limit = int(limit)

                if limit > 6:
                    queryset = queryset[:6]
                else:
                    queryset = queryset[:limit]
            except ValueError:
                pass

        return queryset


class BlogPostRetrieveAPIView(RetrieveAPIView):
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
