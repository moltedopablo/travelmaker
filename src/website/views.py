from django.shortcuts import render
from .models import Activity, Trip, Itinerary, Reservation, ActivitiesItinerary
from rest_framework import viewsets
from .serializers import ActivitySerializer, TripSerializer, ItinerarySerializer, ReservationSerializer, \
    ActivitiesItinerarySerializer


class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all().order_by('-created_date')
    serializer_class = TripSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filter_fields = ('trip', 'title', 'description', 'order')


class ActivitiesItineraryViewSet(viewsets.ModelViewSet):
    queryset = ActivitiesItinerary.objects.all()
    serializer_class = ActivitiesItinerarySerializer
    filter_fields = ('itinerary', 'activity', 'day')


class ItineraryViewSet(viewsets.ModelViewSet):
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer
    filter_fields = ('trip', 'start_date', 'title', 'duration')


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
