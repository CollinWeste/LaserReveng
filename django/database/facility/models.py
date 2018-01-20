from django.db import models


class Facility(models.Model):
    name = models.CharField(max_length=255, primary_key=True)
    location = models.CharField(max_length=255)


class Arena(models.Model):
    id = models.DecimalField(decimal_places=1,max_digits=20, primary_key=True)
    facility = models.ForeignKey('Facility', on_delete=models.CASCADE,)


#need to figure out what we are going to do with the settings
class Game(models.Model):
    arena = models.ForeignKey('Arena', on_delete=models.CASCADE, )
    settings = models.TextField()
    start_time = models.CharField(max_length=255)
    end_time = models.CharField(max_length=255)


class Log(models.Model):
    game = models.ForeignKey('Game', on_delete=models.CASCADE, )
    time = models.CharField(max_length=255)
    player = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    orientation = models.CharField(max_length=255)
    hit = models.CharField(max_length=255)
    shot = models.CharField(max_length=255)
    health = models.CharField(max_length=255)
    stun = models.CharField(max_length=255)
    teamchange = models.CharField(max_length=255)


class Player(models.Model):
    games = models.ForeignKey('Game', on_delete=models.CASCADE, )
    PackID = models.DecimalField(decimal_places=2, max_digits=20)
    memberID = models.ForeignKey('User', on_delete=models.CASCADE, )
    totalHit = models.DecimalField(decimal_places=2, max_digits=20)
    totalDamage = models.DecimalField(decimal_places=2, max_digits=20)
    totalHealth = models.DecimalField(decimal_places=2, max_digits=20)
    team = models.CharField(max_length=255)


class User(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    member = models.CharField(max_length=255)
