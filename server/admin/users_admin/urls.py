from django.urls import path
from .views import (
    AdminUserRetrieveView,
    AdminTokenObtainPairView,
    AdminTokenRefreshView,
    AdminTokenVerifyView,
    AdminLogoutView,
    GetCSRFToken,
)

urlpatterns = [
    path('users/me/', AdminUserRetrieveView.as_view()),
    path('jwt/create/', AdminTokenObtainPairView.as_view()),
    path('jwt/refresh/', AdminTokenRefreshView.as_view()),
    path('jwt/verify/', AdminTokenVerifyView.as_view()),
    path('users/logout/', AdminLogoutView.as_view()),
    path('csrf/', GetCSRFToken.as_view()),
]
