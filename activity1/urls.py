from django.urls import path
from myapp import views
from django.contrib import admin
from django.urls import path, include



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('myapp.urls')),
    path('', views.home, name='home'),  # Add this line for the home page
]
