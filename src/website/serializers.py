from .models import Trip, Activity, DayRange, DayRangeActivities, Itinerary, Reservation
from rest_framework import serializers


class TripSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Trip
        fields = ('title', 'created_date')


class ActivitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Activity
        fields = ('trip', 'title', 'description', 'order')


class ItinerarySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Itinerary
        fields = ('trip', 'start_date', 'title', 'duration')


class ReservationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Reservation
        fields = ('trip', 'date', 'title', 'description')


class DayRangeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DayRange
        fields = ('itinerary', 'start', 'end', 'activities')


class DayRangeActivitiesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DayRangeActivities
        fields = ('activity', 'day_range')
