# Generated by Django 3.2.4 on 2021-07-01 11:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("companies", "0003_company_eauth_profile"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="company",
            name="manual_city",
        ),
        migrations.RemoveField(
            model_name="company",
            name="manual_company_form",
        ),
        migrations.RemoveField(
            model_name="company",
            name="manual_industry",
        ),
        migrations.RemoveField(
            model_name="company",
            name="manual_postcode",
        ),
        migrations.RemoveField(
            model_name="company",
            name="manual_street_address",
        ),
    ]
