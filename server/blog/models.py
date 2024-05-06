from django.db import models


class Author(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    thumbnail = models.ImageField(upload_to='author/')
    date_created = models.DateField(auto_now_add=True)
    date_updated = models.DateField(auto_now=True)

    def delete(self):
        self.thumbnail.storage.delete(self.thumbnail.name)

        super().delete()

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    excerpt = models.CharField(max_length=400)
    thumbnail = models.ImageField(upload_to='blog/')
    thumbnail_alt = models.CharField(max_length=50, default='Thumbnail')
    content = models.TextField()
    is_published = models.BooleanField(default=True)
    date_created = models.DateField(auto_now_add=True)
    date_updated = models.DateField(auto_now=True)

    def delete(self):
        if self.thumbnail:
            self.thumbnail.storage.delete(self.thumbnail.name)

        super().delete()

    def __str__(self):
        return self.title
