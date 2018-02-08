from django.shortcuts import render
from .models import Activity, Trip, Itinerary, DayRange, Reservation, DayRangeActivities
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from .serializers import ActivitySerializer, TripSerializer, ItinerarySerializer, DayRangeSerializer, \
    ReservationSerializer, DayRangeActivitiesSerializer
from rest_framework import generics


def index(request):
    activities = Activity.objects.order_by('order')
    return render(request, 'website/index.html', {'activities': activities})


class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all().order_by('-created_date')
    serializer_class = TripSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class ItineraryViewSet(viewsets.ModelViewSet):
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer


class DayRangeViewSet(viewsets.ModelViewSet):
    queryset = DayRange.objects.all()
    serializer_class = DayRangeSerializer


class DayRangeActivitiesViewSet(viewsets.ModelViewSet):
    queryset = DayRangeActivities.objects.all()
    serializer_class = DayRangeActivitiesSerializer


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer


class ActivityList(generics.ListAPIView):
    serializer_class = ActivitySerializer

    def get_queryset(self):
        queryset = Activity.objects.all()
        title = self.request.query_params.get('title', None)

        if title is not None:
            queryset = queryset.filter(title__search=title)
        return queryset
