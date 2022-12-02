from django.db import models

# Create your models here.
# Refers back to location model in wardrobe
class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()


# Hat model represents user that wants to create a hat
class Hat(models.Model):
    fabric = models.CharField(max_length=100)
    style_name = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    url = models.URLField(null=True)

    location = models.ForeignKey(
        "LocationVO",
        related_name="hats",
        on_delete=models.CASCADE,
    )
