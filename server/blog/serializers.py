from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField
)
from .models import BlogPost


class BlogPostSerializer(ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'
        depth = 1

    thumbnail = SerializerMethodField()

    def get_thumbnail(self, obj):
        request = self.context.get('request')
        thumbnail = obj.thumbnail.url

        return request.build_absolute_uri(thumbnail)
