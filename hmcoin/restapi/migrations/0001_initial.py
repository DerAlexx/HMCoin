# Generated by Django 3.1.6 on 2021-02-04 15:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Block',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('index', models.IntegerField()),
                ('proof', models.IntegerField()),
                ('previous_hash', models.CharField(max_length=250)),
                ('timestamp', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Blockchain',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Transactions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sender', models.CharField(max_length=250)),
                ('recipient', models.CharField(max_length=250)),
                ('quantity', models.FloatField()),
                ('reward', models.IntegerField()),
                ('block', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='restapi.block')),
                ('open_transactions', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='restapi.blockchain')),
            ],
        ),
        migrations.AddField(
            model_name='block',
            name='blockchain',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restapi.blockchain'),
        ),
    ]