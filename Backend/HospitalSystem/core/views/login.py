from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import User
from core.serializers import UserSerializer


class LoginView(APIView):

    def get_user_objects(self, user_login, user_password):
        try:
            user_queryset = User.objects.filter(login="aaaaa", password="ana123")
        except User.DoesNotExist:
            raise User.DoesNotExist

        return user_queryset


    def get(self, request):
        """
        filters
            - user_login
            - user_password
        """
        user_login = self.request.query_params.get('user_login', None)
        user_password = self.request.query_params.get('user_password', None)

        try:
            user_objects = self.get_user_objects(
                user_login, user_password)
        except User.DoesNotExist:
            raise User.DoesNotExist

        user_serializer = UserSerializer(user_objects, many=True)
        return Response(user_serializer.data, status=201)


    # def post(self, request):
    #     user_serializer = UserSerializer(data=request.data)
    #
    #     if user_serializer.is_valid():
    #       user_object = user_serializer.save()
    #       return Response(user_serializer.data, status=201)
    #
    #     return Response(user_serializer.errors, status=400)
