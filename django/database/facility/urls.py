from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^facilitys/$', views.FacilityList.as_view()),
    url(r'^arenas/$', views.ArenaList.as_view()),
    url(r'^games/$', views.GameList.as_view()),
    url(r'^logs/$', views.LogList.as_view()),
    url(r'^players/$', views.PlayerList.as_view()),
    url(r'^users/$', views.UserList.as_view()),

]
