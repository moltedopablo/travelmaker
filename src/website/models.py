from django.db import models
from django.utils.timezone import now


class Trip(models.Model):
    title = models.CharField(max_length=200)
    created_date = models.DateTimeField('date created', default=now)

    def __str__(self):
        return self.title


class Activity(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Itinerary(models.Model):
    start_date = models.DateTimeField()
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    duration = models.IntegerField()

    def __str__(self):
        return self.title


class DayRange(models.Model):
    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE)
    start = models.IntegerField()
    end = models.IntegerField()
    activities = models.ManyToManyField(Activity, through='DayRangeActivities')

    def __str__(self):
        return "{} - {}".format(self.start, self.end)


class DayRangeActivities(models.Model):
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    day_range = models.ForeignKey(DayRange, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.day_range)


class Reservation(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    date = models.DateTimeField()
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.start
