from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import User
from core.serializers import UserSerializer


class UserView(APIView):

  def get(self, request, id):
    try:
        user_queryset = User.objects.get(id=id)
        user_serializer = UserSerializer(user_queryset)
    except User.DoesNotExist:
        return Response({'errors': 'This user does not exist.'}, status=400)

    return Response(user_serializer.data)


  def post(self, request):
    user_serializer = UserSerializer(data=request.data)

    if user_serializer.is_valid():
      user_object = user_serializer.save()
      return Response(user_serializer.data, status=201)

    return Response(user_serializer.errors, status=400)


  def put(self, request, id=None):
    try:
      user_object = User.objects.get(id=id)
    except User.DoesNotExist:
      return Response({'errors': 'This user does not exist.'}, status=400)

    user_serializer = UserSerializer(user_object, data=request.data)
    if user_serializer.is_valid():
      user_object = user_serializer.save()
      return Response(user_serializer.data, status=200)

    return Response(user_serializer.errors, status=400)


  def delete(self, request, id=None):
    try:
      user_object = User.objects.get(id=id)
    except User.DoesNotExist:
      return Response({'errors': 'This user does not exist.'}, status=400)

    user_object.delete()

    return Response(status=204)
