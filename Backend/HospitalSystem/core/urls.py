from django.urls import path

from core.views import UserView

urlpatterns = [
  path('user/', UserView.as_view()),
  path('user/<int:id>/', UserView.as_view()),
]
