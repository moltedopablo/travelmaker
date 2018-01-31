from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('activity/<int:activity_id>', views.activty_detail, name='activity_detail')
]
