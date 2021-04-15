# Generated by Django 3.1.3 on 2021-03-28 02:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_type',
            field=models.CharField(blank=True, choices=[('RECEPTIONIST', 'receptionist'), ('DOCTOR', 'doctor'), ('PATIENCE', 'patience')], max_length=20, null=True),
        ),
    ]