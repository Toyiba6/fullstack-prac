from django.urls import path
from .views import TeamAPIView
from .views import StudentAPIView

    

urlpatterns = [
    path("teams/", TeamAPIView.as_view()),
    path("teams/<int:pk>/", TeamAPIView.as_view()),
    path('students/', StudentAPIView.as_view(), name='students'),
    path('students/<int:pk>/', StudentAPIView.as_view(), name='single student'),
    path('students/<str:action>/', StudentAPIView.as_view(), name='students')
]
from django.urls import path
from .views import TeamAPIView


