from django.conf.urls import url, include
from rest_framework import routers
from website import views
from .views import ActivityList

router = routers.DefaultRouter()
router.register(r'trips', views.TripViewSet)
router.register(r'activities', views.ActivityViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^activities_list/', ActivityList.as_view()),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
