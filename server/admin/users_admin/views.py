from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from .serializers import (
    AdminUserSerializer,
    AdminTokenObtainPairSerializer
)
from django.middleware.csrf import rotate_token
from django.views.decorators.csrf import (
    ensure_csrf_cookie,
    csrf_protect
)
from django.utils.decorators import method_decorator
from django.contrib.auth import get_user_model
User = get_user_model()


@method_decorator(csrf_protect, name='dispatch')
class AdminUserRetrieveView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        user = AdminUserSerializer(request.user)

        return Response(user.data, status=status.HTTP_200_OK)


@method_decorator(csrf_protect, name='dispatch')
class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class = AdminTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')

            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )
            response.set_cookie(
                'refresh',
                refresh_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )
            rotate_token(request)

        return response


@method_decorator(csrf_protect, name='dispatch')
class AdminTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')

        if refresh_token:
            request.data['refresh'] = refresh_token

        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')

            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )

        return response


@method_decorator(csrf_protect, name='dispatch')
class AdminTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access')

        if access_token:
            request.data['token'] = access_token

        return super().post(request, *args, **kwargs)


class AdminLogoutView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie('access')
        response.delete_cookie('refresh')

        return response


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    def get(self, request):
        return Response(status=status.HTTP_204_NO_CONTENT)
