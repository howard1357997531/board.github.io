# Generated by Django 4.1.3 on 2022-11-22 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("backend", "0009_article_likes_like"),
    ]

    operations = [
        migrations.AlterField(
            model_name="article",
            name="description",
            field=models.TextField(max_length=600),
        ),
    ]