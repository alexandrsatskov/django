from django.shortcuts import redirect


def unauthenticated_user(func):
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('index')
        else:
            return func(request, *args, **kwargs)
    return wrapper
