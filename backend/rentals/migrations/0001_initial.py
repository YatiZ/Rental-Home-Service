# Generated by Django 5.1.1 on 2024-09-30 16:28

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Homes",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                (
                    "main_img",
                    models.ImageField(
                        default="backend/media/uploads/homes/dummy-home.jpg",
                        upload_to="uploads/homes",
                    ),
                ),
                ("description", models.TextField()),
                ("price_per_month", models.IntegerField()),
                ("address", models.TextField()),
                ("built_at", models.DateField()),
                ("bedrooms", models.PositiveIntegerField(default=1)),
                ("bathrooms", models.PositiveIntegerField(default=1)),
                ("living_areas", models.PositiveIntegerField()),
                ("kitchen", models.BooleanField(default=True)),
                ("laundry", models.BooleanField(default=False)),
                ("heating", models.BooleanField(default=False)),
                ("cooling", models.BooleanField(default=False)),
                ("water_supply", models.BooleanField(default=True)),
                ("internet_access", models.BooleanField(default=True)),
                ("electricity", models.BooleanField(default=True)),
                ("security_system", models.BooleanField(default=False)),
                ("smoke_detector", models.BooleanField(default=False)),
                ("yard", models.BooleanField(default=False)),
                ("parking_space", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="Image",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("image", models.ImageField(upload_to="uploads/homes")),
                (
                    "homes",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="images",
                        to="rentals.homes",
                    ),
                ),
            ],
        ),
    ]
