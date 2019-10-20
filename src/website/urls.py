from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers
from website import views

router = routers.DefaultRouter()
router.register(r'trips', views.TripViewSet)
router.register(r'activities', views.ActivityViewSet)
router.register(r'itineraries', views.ItineraryViewSet)
router.register(r'activities_itinerary', views.ActivitiesItineraryViewSet)
router.register(r'reservations', views.ReservationViewSet)

urlpatterns = [
    url(r'api/', include(router.urls)),
    url(r'api/api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
