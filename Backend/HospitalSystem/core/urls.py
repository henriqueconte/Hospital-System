from django.urls import path

from core.views import UserView, DoctorsView, AppointmentView, ReportView, LoginView

urlpatterns = [
    path('user/', UserView.as_view()),
    path('doctors/', DoctorsView.as_view()),
    path('user/<int:id>/', UserView.as_view()),
    path('login/', LoginView.as_view()),
    path('appointment/', AppointmentView.as_view()),
    path('report/', ReportView.as_view()),
    #path('appointment/<int:patient>/', AppointmentView.as_view()),
]
