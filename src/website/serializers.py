from .models import Trip, Activity, ActivitiesItinerary, Itinerary, Reservation
from rest_framework import serializers


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ('id', 'title', 'created_date')


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('id', 'trip', 'title', 'description', 'order')


class ActivitiesItinerarySerializer(serializers.ModelSerializer):

    class Meta:
        model = ActivitiesItinerary
        fields = ('id', 'day', 'activity', 'itinerary')


class ItinerarySerializer(serializers.ModelSerializer):

    class Meta:
        model = Itinerary
        fields = ('id', 'trip', 'start_date', 'title', 'duration', )


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ('trip', 'date', 'title', 'description')
