from django.urls import path

from core.views import UserView
from core.views import AppointmentView

urlpatterns = [
  path('user/', UserView.as_view()),
  path('user/<int:id>/', UserView.as_view()),
  path('appointment/', AppointmentView.as_view()),
  path('appointment/<int:patience>/', AppointmentView.as_view()),
]
