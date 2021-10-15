from django.contrib import admin
from .models import Country, City, Hotel, Tour, TourReview, AboutUsReview
# Register your models here.

admin.site.register([Country, City, Hotel, Tour, TourReview, AboutUsReview])
