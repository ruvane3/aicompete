from django.urls import path
from django.conf.urls import url
from django.contrib import admin


from . import views

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    url(r'tic-tac-toe-create', views.tictactoe_create, name='tic-tac-toe-create'),
    url(r'api/create_game/', views.create_new_match),
    url(r'api/is_my_turn/', views.is_my_turn),
    url(r'api/submit_action/', views.submit_action),
    path('api/game_info/<str:game_type>/<str:game_id>', views.get_game_info),
    path('game/<str:game_type>/<str:game_id>', views.show_game)
]


urlpatterns += staticfiles_urlpatterns()
