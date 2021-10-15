from django.db import models
from django.contrib.auth.models import User

"""Создание ORM моделей:
1) Country
2) City
3) Tour
4) Hotel
5) Hotel Review
"""


class Country(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    desc = models.TextField(verbose_name='Описание')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Страна'
        verbose_name_plural = 'Страны'


class City(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    desc = models.TextField(verbose_name='Описание')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Город'
        verbose_name_plural = 'Города'


class Hotel(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    desc = models.TextField(verbose_name='Описание')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Отель'
        verbose_name_plural = 'Отели'


class Tour(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    desc = models.TextField(verbose_name='Описание')
    price = models.IntegerField(verbose_name='Цена')
    days = models.IntegerField(verbose_name='Кол-во дней')
    participants = models.IntegerField(verbose_name='Максимальное кол-во участников')
    img = models.ImageField(upload_to='static/img', verbose_name='Изображение тура')
    rate = models.IntegerField(verbose_name='Рейтинг', default=0)
    date = models.CharField(max_length=100, verbose_name='Даты вылета')
    # Foreign Keys
    country = models.ForeignKey(Country, on_delete=models.CASCADE, verbose_name='Страна')
    city = models.ForeignKey(City, on_delete=models.CASCADE, verbose_name='Город')
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, verbose_name='Отель')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Тур'
        verbose_name_plural = 'Туры'


class TourReview(models.Model):
    desc = models.TextField(verbose_name='Описание')
    rate = models.IntegerField(verbose_name='Рейтинг', default=0)
    # Foreign Keys
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, verbose_name='Тур')

    def __str__(self):
        return self.desc

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'


class AboutUsReview(models.Model):
    desc = models.TextField(verbose_name='Описание')
    rate = models.IntegerField(verbose_name='Рейтинг', default=0)
    # Foreign Keys
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')

    def __str__(self):
        return self.desc

    class Meta:
        verbose_name = 'Отзыв о компании'
        verbose_name_plural = 'Отзывы о компании'
