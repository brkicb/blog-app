from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

urlpatterns = [
    path('admin/', include('admin.users_admin.urls')),
    path('admin/blog/', include('admin.blog_admin.urls')),
    path('api/blog/', include('blog.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
