from .models import Trip, Activity, DayRange, DayRangeActivities, Itinerary, Reservation
from rest_framework import serializers


class TripSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Trip
        fields = ('id', 'title', 'created_date')


class ActivitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Activity
        fields = ('trip', 'title', 'description', 'order')


class ItinerarySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Itinerary
        fields = ('id', 'trip', 'start_date', 'title', 'duration')


class ReservationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Reservation
        fields = ('trip', 'date', 'title', 'description')


class DayRangeActivitiesSerializer(serializers.HyperlinkedModelSerializer):
    day_range = serializers.PrimaryKeyRelatedField(queryset=DayRange.objects.all(), source='parent.id')
    class Meta:
        model = DayRangeActivities
        fields = ('activity', 'day_range')


class DayRangeSerializer(serializers.HyperlinkedModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)

    class Meta:
        model = DayRange
        fields = ('itinerary', 'start', 'end', 'activities')
