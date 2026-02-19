from rest_framework import serializers
from .models import Student, Team


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


class TeamSerializer(serializers.ModelSerializer):
    students = serializers.PrimaryKeyRelatedField(
        queryset=Student.objects.all(),
        many=True
    )

    class Meta:
        model = Team
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['students'] = StudentSerializer(instance.students.all(), many=True).data
        return representation

    def validate_students(self, value):
        if len(value) < 1:
            raise serializers.ValidationError("A team must have at least 1 student.")
        if len(value) > 4:
            raise serializers.ValidationError("A team can have at most 4 students.")
        return value
