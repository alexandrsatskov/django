from django.forms import ModelForm, \
    TextInput, Textarea, NumberInput, HiddenInput, PasswordInput

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms

from .models import TourReview


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
        widgets = {
            'username': TextInput(attrs={
                'class': 'register__input'
            }),
            'email': TextInput(attrs={
                'class': 'register__input'
            })
        }

    def clean_email(self):
        email = self.cleaned_data.get('email')

        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("This email is already used")

        return email
