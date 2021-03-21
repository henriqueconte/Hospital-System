from django.urls import path

from core.views import UserView
from core.views import DoctorView
from core.views import ConsultationView

urlpatterns = [
  path('user/', UserView.as_view()),
  path('user/<int:id>/', UserView.as_view()),
  path('doctor/', DoctorView.as_view()),
  path('doctor/<int:id>/', DoctorView.as_view()),
  path('consultation/', ConsultationView.as_view()),
  path('consultation/<int:id>/', ConsultationView.as_view()),
]
