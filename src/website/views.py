from django.shortcuts import render
from .models import Activity, Trip, Itinerary, DayRange, Reservation, DayRangeActivities
from rest_framework import viewsets
from .serializers import ActivitySerializer, TripSerializer, ItinerarySerializer, DayRangeSerializer, \
    ReservationSerializer, DayRangeActivitiesSerializer


def index(request):
    activities = Activity.objects.order_by('order')
    return render(request, 'website/index.html', {'activities': activities})


class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all().order_by('-created_date')
    serializer_class = TripSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filter_fields = ('trip', 'title', 'description', 'order')


class ItineraryViewSet(viewsets.ModelViewSet):
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer
    filter_fields = ('trip', 'start_date', 'title', 'duration')


class DayRangeViewSet(viewsets.ModelViewSet):
    queryset = DayRange.objects.all()
    serializer_class = DayRangeSerializer
    filter_fields = ('itinerary', 'start', 'end', 'activities')


class DayRangeActivitiesViewSet(viewsets.ModelViewSet):
    queryset = DayRangeActivities.objects.all()
    serializer_class = DayRangeActivitiesSerializer


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
