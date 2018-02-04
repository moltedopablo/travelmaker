from django.shortcuts import render
from .models import Activity, Trip
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from .serializers import ActivitySerializer, TripSerializer
from rest_framework import generics


class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all().order_by('-created_date')
    serializer_class = TripSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class ActivityList(generics.ListAPIView):
    serializer_class = ActivitySerializer

    def get_queryset(self):
        queryset = Activity.objects.all()
        title = self.request.query_params.get('title', None)

        if title is not None:
            queryset = queryset.filter(title__search=title)
        return queryset
