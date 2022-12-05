from colorfield.fields import ColorField
from django.db import models

# Create your models here.

# class
class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()
    import_href = models.CharField(max_length=200, unique=True, null=True)

    def __str__(self):
        return self.closet_name


class Shoe(models.Model):
    manufacturer =models.CharField(max_length=50)
    model_name = models.CharField(max_length=50)
    color = ColorField(default='#000000')
    picture_url = models.URLField(max_length=2000)

    bin = models.ForeignKey(
        "BinVO",
        related_name="shoes",
        on_delete=models.CASCADE,
        )
    def __str__(self):
        return self.model_name
