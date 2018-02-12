from django.contrib import admin

from .models import Trip
from .models import Activity
from .models import Itinerary

admin.site.register(Trip)
admin.site.register(Activity)
admin.site.register(Itinerary)
