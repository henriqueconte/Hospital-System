from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import User
from core.serializers import UserSerializer


class DoctorsView(APIView):

    def get(self, request):
        try:
            user_queryset = User.objects.filter(user_type=User.DOCTOR)
            user_serializer = UserSerializer(user_queryset, many=True)
        except User.DoesNotExist:
            return Response({'errors': 'This user does not exist.'}, status=400)

        return Response(user_serializer.data)
