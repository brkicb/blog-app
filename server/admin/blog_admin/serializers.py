from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField,
    ValidationError,
)
from blog.models import Author, BlogPost


class AuthorSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

    thumbnail = SerializerMethodField()

    def get_thumbnail(self, obj):
        request = self.context.get('request')
        thumbnail = obj.thumbnail.url

        return request.build_absolute_uri(thumbnail)

    def create(self, validated_data):
        thumbnail = self.context.get(
            'request').data['thumbnail']

        if not thumbnail:
            raise ValidationError({'thumbnail': 'This field is required'})

        validated_data['thumbnail'] = thumbnail
        author = Author.objects.create(**validated_data)

        return author

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)

        thumbnail = self.context.get('request').data.get('thumbnail')

        if (thumbnail):
            instance.thumbnail = thumbnail

        instance.save()

        return instance


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

    def create(self, validated_data):
        author_id = self.context.get('request').data['author']
        if not author_id:
            raise ValidationError({'author': 'This field is required'})

        try:
            author_id = int(author_id)
            author = Author.objects.get(id=author_id)

            validated_data['author'] = author
        except:
            raise ValidationError({'author': 'Author with this id not found'})

        thumbnail = self.context.get('request').data['thumbnail']
        if not thumbnail:
            raise ValidationError({'thumbnail': 'This field is required'})
        validated_data['thumbnail'] = thumbnail

        blog_post = BlogPost.objects.create(**validated_data)

        return blog_post

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)

        author_id = self.context.get('request').data.get('author')

        if author_id:
            try:
                author_id = int(author_id)
                author = Author.objects.get(id=author_id)

                instance.author = author
            except:
                pass

        thumbnail = self.context.get('request').data.get('thumbnail')

        if (thumbnail):
            instance.thumbnail = thumbnail

        instance.save()

        return instance
