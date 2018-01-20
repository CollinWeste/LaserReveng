from .models import Facility #need to import each model individually
from .models import Arena
from .models import Game
from .models import Log
from .models import Player
from .models import User
from rest_framework import serializers

#create a serializer for each model
class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = ('name', 'location')


class ArenaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Arena
        fields = ('id', 'facility')


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id','arena', 'settings', 'start_time', 'end_time')


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = ('id','game', 'time', 'player', 'location', 'orientation', 'hit', 'shot', 'health', 'stun', 'teamchange')


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id','games', 'PackID', 'memberID', 'totalHit', 'totalDamage', 'totalHealth', 'team')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','name', 'phone', 'member')
