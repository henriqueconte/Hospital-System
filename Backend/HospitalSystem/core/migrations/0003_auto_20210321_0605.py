# Generated by Django 3.1.3 on 2021-03-21 06:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_consultation_doctor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='consultation',
            name='doctor_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='doctor', to='core.doctor'),
        ),
    ]
