from django.contrib import admin
from .models import Student, Team

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display =['id','name','email','age']
    search_fields =['id','age']


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display =['id','name', 'no_of_students']
    search_fields =['id','name']

    def no_of_students(self, obj):
        return obj.students.count()
    no_of_students.short_description = "Number of Students"


    


