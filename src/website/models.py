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
