from django.urls import path
from django.conf.urls import url
from django.contrib import admin


from . import views

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    url(r'api/is_my_turn/', views.is_my_turn),
    url(r'api/submit_action/', views.submit_action)
]


urlpatterns += staticfiles_urlpatterns()
