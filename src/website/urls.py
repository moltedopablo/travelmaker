from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers
from website import views
from .views import ActivityList

router = routers.DefaultRouter()
router.register(r'trips', views.TripViewSet)
router.register(r'activities', views.ActivityViewSet)

urlpatterns = [
    path('', views.index, name='index'),
    url(r'api/', include(router.urls)),
    url(r'api/activity_list/', ActivityList.as_view()),
    url(r'api/api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
