from django.db import models

# Wardrobe -> models.py -> location model

class LocationVO(models.Model):
    closet_name = models.CharField(max_length=200)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()
    import_href = models.CharField(max_length=200, unique=True, null=True)

    def __str__(self):
        return self.closet_name

# Hat model represents user that wants to create a hat
class Hat(models.Model):
    fabric = models.CharField(max_length=100)
    style_name = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    url = models.URLField(max_length=500)

    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,

    )
    def __str__(self):
        return self.fabric

# The ForeignKey field is a field that holds the ID of a Location.
# The related_name parameter is optional, but it allows us to access the hats field on the Location class.
# The __str__ method tells Django how to calculate the string representation of a Hat object.
