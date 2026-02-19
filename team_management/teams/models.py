from django.db import models
from django.core.exceptions import ValidationError


class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    age = models.IntegerField()

    def __str__(self):
        return self.name

# class Faculty(model.Model):
#     name = models.CharField(max_length=100)


class Team(models.Model):
    name = models.CharField(max_length=100)
    students = models.ManyToManyField(Student, related_name="teams")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


