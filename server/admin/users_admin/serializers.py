from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
User = get_user_model()


class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email']


class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
    def is_admin(self, user):
        if user.is_staff and user.is_superuser:
            return True
        return False

    def validate(self, attrs):
        data = super().validate(attrs)

        if not self.is_admin(self.user):
            raise AuthenticationFailed(
                self.error_messages['no_active_account'],
                'no_active_account'
            )

        return data
