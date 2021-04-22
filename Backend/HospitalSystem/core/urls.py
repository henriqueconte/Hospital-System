from django.urls import path

from core.views import UserView
from core.views import DoctorsView
from core.views import AppointmentView

urlpatterns = [
    path('user/', UserView.as_view()),
    path('doctors/', DoctorsView.as_view()),
    path('user/<int:id>/', UserView.as_view()),
    path('appointment/', AppointmentView.as_view()),
    #path('appointment/<int:patient>/', AppointmentView.as_view()),
]
