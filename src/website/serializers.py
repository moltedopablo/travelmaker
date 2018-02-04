from .models import Trip, Activity
from rest_framework import serializers


class TripSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Trip
        fields = ('title', 'created_date')


class ActivitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Activity
        fields = ('trip', 'title', 'description', 'order')
