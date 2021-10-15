from django.shortcuts import render, redirect, reverse
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail, EmailMessage

from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from .models import Tour, TourReview, AboutUsReview, Country, City
from .forms import CreateUserForm
from .decorators import unauthenticated_user

from datetime import datetime

UserModel = get_user_model()


def is_intervals_intersect(query_time: str, tour_time: str) -> bool:
    """Проверяет что временные интервалы у
    курьера и заказа пересекаются
    """
    query_start, query_end = \
        [datetime.strptime(time, '%d%b') for time in query_time.split('-')]

    tour_start, tour_end = \
        [datetime.strptime(time, '%d%b') for time in tour_time.split('-')]

    if not ((query_start >= tour_end) or (tour_start >= query_end)):
        return True
    return False


MIN_NIGHTS = '5'
MAX_NIGHTS = '20'
DEFAULT_NIGHTS = '8'

MIN_PARTICIPANTS = '1'
MAX_PARTICIPANTS = '8'
DEFAULT_PARTICIPANTS = '2'

MIN_PRICE = '0'
max_price = '70000'
if Tour.objects.order_by('-price').first() is not None:
    max_price = Tour.objects.order_by('-price').first().price


CITIES = City.objects.all()
COUNTRIES = Country.objects.all()


# Create your views here.
def index(request):
    tours = Tour.objects.all()[:4]
    context = {
        'MIN_NIGHTS': MIN_NIGHTS,
        'MAX_NIGHTS': MAX_NIGHTS,
        'DEFAULT_NIGHTS': DEFAULT_NIGHTS,
        'MIN_PARTICIPANTS': MIN_PARTICIPANTS,
        'MAX_PARTICIPANTS': MAX_PARTICIPANTS,
        'DEFAULT_PARTICIPANTS': DEFAULT_PARTICIPANTS,
        'tours': tours,
        'CITIES': CITIES,
        'COUNTRIES': COUNTRIES,
        'rate_quantity': list(range(10, 0, -1)),
    }
    return render(request, 'main/index.html', context)


def find_tour(request):
    tours = Tour.objects.all()
    query_params = {
        'country': request.GET.get('country', 'Любая'),
        'city': request.GET.get('city', 'Любой'),
        'rate': request.GET.get('rate', '0'),
        'date': request.GET.get('date', 'Любая'),
        'nights': request.GET.get('nights', MIN_NIGHTS),
        'participants': request.GET.get('participants', MIN_PARTICIPANTS),
        'price_from': request.GET.get('price_from', MIN_PRICE),
        'price_to': request.GET.get('price_to', max_price),
        'rate_quantity': list(range(10, 0, -1)),
        'sort': request.GET.get('sort', ''),
        'CITIES': CITIES,
        'COUNTRIES': COUNTRIES,
        'MIN_PRICE': MIN_PRICE,
        'MAX_PRICE': max_price
    }
    print(tours)
    if query_params['country'] != '' and query_params['country'] != 'Любая':
        tours = tours.filter(country__name=query_params['country'])
    if query_params['city'] != '' and query_params['city'] != 'Любой':
        tours = tours.filter(city__name=query_params['city'])

    tours = tours.filter(rate__gte=query_params['rate'])
    tours = tours.filter(days__gte=query_params['nights'])
    tours = tours.filter(participants__gte=query_params['participants'])
    tours = tours.filter(price__gte=query_params['price_from'],
                         price__lte=query_params['price_to'])

    tours_temp = []
    if query_params['date'] != '' and query_params['date'] != 'Любая':
        for _tour in tours:
            if is_intervals_intersect(query_params['date'], _tour.date):
                tours_temp.append(_tour)
        tours = tours_temp

    if query_params['sort'] and query_params['sort'] == 'price':
        tours = tours.order_by('price')
    if query_params['sort'] and query_params['sort'] == 'price-desc':
        tours = tours.order_by('-price')
    if query_params['sort'] and query_params['sort'] == 'rate':
        tours = tours.order_by('-rate')

    query_params['tours'] = tours
    return render(request, 'main/find-tour.html', query_params)
    # print(dir(request), request.GET)


def tour(request, _id):
    _tour = Tour.objects.get(id=_id)
    reviews = TourReview.objects.filter(tour=_tour.id)

    can_review = True
    print(can_review)
    if request.user.is_authenticated:
        if reviews.filter(user=request.user):
            can_review = False

    if request.method == 'POST':
        TourReview.objects.create(
            desc=request.POST['desc'],
            rate=request.POST['rate'],
            tour=_tour,
            user=request.user
        )
        _tour.rate = round((int(_tour.rate) + int(request.POST['rate'])) / len(reviews))
        _tour.save()
        return redirect('index')

    return render(request, 'main/tour.html',
                  {'tour': _tour,
                   'reviews': reviews,
                   'reviews_length': len(reviews),
                   'rate_quantity': list(range(10, 0, -1)),
                   'can_review': can_review})


def about(request):
    reviews = AboutUsReview.objects.all()

    can_review = True
    if request.user.is_authenticated:
        if AboutUsReview.objects.filter(user=request.user):
            can_review = False

    if request.method == 'POST':
        AboutUsReview.objects.create(
            desc=request.POST['desc'],
            rate=request.POST['rate'],
            user=request.user
        )
        return redirect('index')

    return render(request, 'main/about.html', {
        'reviews': reviews,
        'rate_quantity': list(range(10, 0, -1)),
        'can_review': can_review
    })


def help(request):
    return render(request, 'main/help.html')


@unauthenticated_user
def register_page(request):
    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()

            current_site = get_current_site(request)
            mail_subject = 'Activate your account.'
            message = render_to_string('main/acc_active_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': default_token_generator.make_token(user),
            })

            to_email = form.cleaned_data.get('email')
            email = EmailMessage(
                mail_subject, message, to=[to_email]
            )
            email.send(fail_silently=False)

            return HttpResponse('Please confirm your email address to complete the registration')
    else:
        form = CreateUserForm()
    return render(request, 'main/register.html', {'form': form})


def activate(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = UserModel._default_manager.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return HttpResponse('Thank you for your email confirmation. Now you can login your account.')
    else:
        return HttpResponse('Activation link is invalid!')

    # if request.method == 'POST':
    #     email = EmailMessage(
    #         'Activate your account',
    #         'Test',
    #         'noreply@semycolon.com',
    #         [request.POST['email']]
    #     )
    #
    #     email.send()
    #     if form.is_valid():
    #         form.save()
    #         user = form.cleaned_data.get('username')
    #         messages.success(request, f'Аккаунт создан! Пользователь {user}')
    #         return redirect('login')


@unauthenticated_user
def login_page(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            messages.info(request, 'Логин или пароль неверный!')
            return render(request, 'main/login.html')

    return render(request, 'main/login.html')


def logout_page(request):
    logout(request)
    return redirect('index')
