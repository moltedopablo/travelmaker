from django.contrib import admin

from .models import Trip
from .models import Activity

admin.site.register(Trip)
admin.site.register(Activity)
