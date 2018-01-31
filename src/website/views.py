from django.shortcuts import render
from .models import Activity
from django.shortcuts import get_object_or_404


def index(request):
    activities = Activity.objects.order_by('order')
    return render(request, 'website/index.html', {'activities': activities})


def activty_detail(request, activity_id):
    activity = get_object_or_404(Activity, pk=activity_id)
    return render(request, 'website/activity_detail.html', {'activity': activity})
