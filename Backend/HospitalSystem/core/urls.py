from django.urls import path

from core.views import UserView
from core.views import DoctorView

urlpatterns = [
  path('user/', UserView.as_view()),
  path('user/<int:id>/', UserView.as_view()),
  path('doctor/', DoctorView.as_view()),
  path('doctor/<int:id>/', DoctorView.as_view()),
]
