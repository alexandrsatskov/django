from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('find-tour', views.find_tour, name='find-tour'),
    path('tour/<int:_id>', views.tour, name='tour'),
    path('about', views.about, name='about'),
    path('help', views.help, name='help'),

    path('register', views.register_page, name='register'),
    path('login', views.login_page, name='login'),
    path('logout', views.logout_page, name='logout'),

    path('activate/<uidb64>/<token>/', views.activate, name='activate'),
]
