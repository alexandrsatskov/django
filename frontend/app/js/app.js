document.addEventListener("DOMContentLoaded", function() {
    function monthToNumber(month) {
        switch (month) {
            case 'Jan':
                return '01'
            case 'Feb':
                return '02'
            case 'Mar':
                return '03'
            case 'Apr':
                return '04'
            case 'May':
                return '05'
            case 'Jun':
                return '06'
            case 'Jul':
                return '07'
            case 'Aug':
                return '08'
            case 'Sep':
                return '09'
            case 'Oct':
                return '10'
            case 'Nov':
                return '11'
            case 'Dec':
                return '12'
        }
    }
    const
        // <-- index.html --->
        help = document.querySelectorAll(".faq__item-heading"),
        increments = document.querySelectorAll('.fa-plus'),
        decrements = document.querySelectorAll('.fa-minus'),
        find_tour_submit = document.querySelector('.find-tour__form-submit'),

        // <-- index.html --->
        hamburger_menu = document.querySelector('.hamburger__inner'),
        hamburger_menu_wrapper = document.querySelector('.hamburger'),
        header_menu = document.querySelector('.header__menu'),

        // <-- find-tour.html --->
        filters = document.querySelector('.filters'),
        filters_heading = document.querySelector('.filters__heading'),
        filters_content = document.querySelector('.filters__content'),
        nights_range = document.getElementById('nights'),
        participants_range = document.getElementById('participants'),
        filters_submit = document.querySelector('.filters__submit'),
        sort = document.querySelector('.sort'),

        // <-- all pages --->
        overlay = document.querySelector(".overlay"),
        scroll_top = document.querySelector('.go-top__inner'),
        wrapper_scroll_top = document.querySelector('.go-top__inner');

    // <-- index.html --->
    if (increments !== null && decrements !== null) {
        for (let i = 0; i < increments.length; i++) {
            increments[i].addEventListener('click', function(event) {
                if (+increments[i].nextElementSibling.value < +increments[i].nextElementSibling.dataset.max) {
                    increments[i].nextElementSibling.value =
                        (+increments[i].nextElementSibling.value + 1).toString();
                }
            });
            decrements[i].addEventListener('click', function(event) {
                if (+decrements[i].previousElementSibling.value > +decrements[i].previousElementSibling.dataset.min) {
                    decrements[i].previousElementSibling.value =
                        (+decrements[i].previousElementSibling.value - 1).toString();
                }
            });
        }
    }


    // <-- find-tour.html --->
    // СОРТИРОВКА
    if (sort !== null) {
        sort.addEventListener('click', function(event) {

            if (event.target === sort.querySelector('.sort__heading')) {
                sort.querySelector('.sort__heading').classList.toggle('sort__heading--active')
                sort.querySelector('.sort__list').classList.toggle('dropdown--active')
            } else if (event.target.classList.contains('dropdown__item')) {
                sort.querySelector('.sort__heading').innerHTML =
                    event.target.textContent
                for (const item of document.querySelectorAll('.dropdown__item')) {
                    item.classList.remove('dropdown__item--active')
                }
                event.target.classList.add('dropdown__item--active')
                sort.querySelector('.sort__list').classList.toggle('dropdown--active')
                sort.querySelector('.sort__heading').classList.toggle('sort__heading--active')
            }

            if (event.target.tagName === 'LI') {
                let href_current_page = window.location.href;
                if (href_current_page.includes('?sort')) {
                    href_current_page = href_current_page.replaceAll(/\?sort=[^&]+/g, '');
                    window.location.replace(`${href_current_page}?sort=${event.target.dataset.sort}`);
                } else if (href_current_page.indexOf('?') === -1) {
                    window.location.replace(`${href_current_page}?sort=${event.target.dataset.sort}`);
                } else {
                    href_current_page = href_current_page.replaceAll(/&sort=[^&]+/g, '');
                    window.location.replace(`${href_current_page}&sort=${event.target.dataset.sort}`);
                }
            }
        });
    }
    const date_input = document.getElementById('departure-date');
    if (date_input !== null) {
        const hdpkr = new HotelDatepicker(date_input, {
            format: 'DD MMM',
            autoClose: false,
            i18n: {
                selected: 'Вы выбрали:',
                night: 'Ночь',
                nights: 'Ночей',
                button: 'Закрыть',
                'checkin-disabled': 'Check-in disabled',
                'checkout-disabled': 'Check-out disabled',
                'day-names-short': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                'day-names': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                'month-names-short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                'month-names': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                'error-more': 'Date range should not be more than 1 night',
                'error-more-plural': 'Date range should not be more than %d nights',
                'error-less': 'Date range should not be less than 1 night',
                'error-less-plural': 'Date range should not be less than %d nights',
                'info-more': 'Выберите даты желаемого вылета',
                'info-more-plural': 'Выберите даты желаемого вылета',
                'info-range': 'Выберите даты желаемого вылета',
                'info-default': 'Выберите даты желаемого вылета'
            }
        });

        date_input.addEventListener('click', function () {
            date_input.value = "";
            hdpkr.open();
        });
    }
    // FILTERS
    if (filters !== null) {

        nights_range.addEventListener("input", function() {
            let content = this.parentElement.querySelector(".filters__item-content");
            content.innerHTML = this.value;
        });
        participants_range.addEventListener("input", function() {
            let content = this.parentElement.querySelector(".filters__item-content");
            content.innerHTML = this.value;
        });
        filters_heading.addEventListener('click', function() {
            window.scrollTo(0, 0)
            overlay.classList.toggle('overlay--show')
            document.body.classList.toggle('body--scroll-lock')
            hamburger_menu.classList.toggle('hamburger--animate')
            filters_content.classList.toggle('filters__content--active')
        });
        const wrap = document.querySelector('.wrap');
        wrap.addEventListener("input",(e) => {
                let _t = e.target;
                _t.parentNode.style.setProperty(`--${_t.id}`, +_t.value);
            },
            false
        );
        filters_submit.addEventListener('click', function (event) {
            event.preventDefault();
            const
               country = document.getElementById('country'),
               city = document.getElementById('city'),
               price = getComputedStyle(document.querySelector('.wrap'));
            let href_current_page = filters_submit.getAttribute('href'),
                rate = document.getElementById('rate').querySelector('input:checked');

            let var_rate;
            if (rate === null) {
                var_rate = 0
            } else {
                var_rate = rate.value
            }

            // Если открыта страница без аргументов в URI
            if (href_current_page.indexOf('?') !== -1) {
               href_current_page = href_current_page.substring(0, href_current_page.indexOf('?'));
            }
            let query_attributes = `country=${country.value}&city=${city.value}&rate=${var_rate}&date=${date_input.value.replaceAll(' ', '')}&nights=${nights_range.value}&participants=${participants_range.value}&price_from=${price.getPropertyValue('--a').trim()}&price_to=${price.getPropertyValue('--b').trim()}`;

            // Simulate a mouse click:
            // window.location.href = `${href_current_page}?${query_attributes}`;

            // // Simulate an HTTP redirect:
            window.location.replace(`${href_current_page}?${query_attributes}`);
        });
    }
    if (find_tour_submit !== null) {

        find_tour_submit.addEventListener('click', function (event) {
            event.preventDefault();
            const
                city = document.getElementById('city'),
                date = document.getElementById('departure-date'),
                nights = document.getElementById('nights'),
                participants = document.getElementById('participants');

            let href_current_page = find_tour_submit.getAttribute('href');

            console.log(href_current_page)
            // Если открыта страница без аргументов в URI
            if (href_current_page.indexOf('?') !== -1) {
                href_current_page = href_current_page.substring(0, href_current_page.indexOf('?'));
            }
            let query_attributes = `city=${city.value}&date=${date_input.value.replaceAll(' ', '')}&nights=${nights.value}&participants=${participants.value}`;

            // Simulate a mouse click:
            window.location.href = `${href_current_page}/find-tour?${query_attributes}`;

            // Simulate an HTTP redirect:
            // window.location.replace(`${href_current_page}/find-tour?${query_attributes}`);
        });
    }

    // <-- about.html, tour.html --->
    const textarea = document.querySelector('.add-review__text');
    if (textarea !== null) {
        textarea.addEventListener('input', () => {
            textarea.style.height = "5px";
            textarea.style.height = (textarea.scrollHeight)+"px";
        });
    }

    // <-- all pages, except login.html, register.html --->
    // HAMBURGER
    hamburger_menu_wrapper.addEventListener('click', () => {
        window.scrollTo(0, 0)

        if (hamburger_menu.classList.contains('hamburger--animate')) {
            header_menu.classList.remove('header__menu--active')
            overlay.classList.remove('overlay--show')
            document.body.classList.remove('body--scroll-lock')
            hamburger_menu.classList.remove('hamburger--animate')
        } else {
            header_menu.classList.add('header__menu--active')
            overlay.classList.add('overlay--show')
            document.body.classList.add('body--scroll-lock')
            hamburger_menu.classList.add('hamburger--animate')
        }

        if (filters!== null && filters_content.classList.contains('filters__content--active')) {
            filters_content.classList.remove('filters__content--active')
        }
    });
    // BODY OVERLAY
    document.querySelector(".overlay").addEventListener('click', function() {
        header_menu.classList.remove('header__menu--active')
        overlay.classList.remove('overlay--show')
        document.body.classList.remove('body--scroll-lock')

        hamburger_menu.classList.remove('hamburger--animate')

        if (filters!== null && filters_content.classList.contains('filters__content--active')) {
            filters_content.classList.remove('filters__content--active')
        }
    });


    // <-- index.html --->
    for (let i = 0; i < help.length; i++) {
        help[i].addEventListener("click", function() {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("faq__item-heading--active");

            /* Toggle between hiding and showing the active panel */
            let panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }

    // GO BACK TO TOP BUTTON
    // wrapper_scroll_top.addEventListener('click', () => {
    //     window.scrollTo(0, 0);
    // });
    // let previous_scroll = 0, transform_clear;
    // window.addEventListener('scroll', () => {
    //     let current_scroll = window.pageYOffset
    //     if (window.pageYOffset > 155) {
    //         wrapper_scroll_top.style.transform = 'translateX(0)'
    //         if ((current_scroll - previous_scroll) <= -100) {
    //
    //             scroll_top.style.transform = 'translateX(0)';
    //             clearTimeout(transform_clear)
    //             transform_clear = setTimeout(() => {
    //                 scroll_top.style.transform = 'translateX(100%)'
    //             }, 3000)
    //         }
    //     }
    //     else {
    //         wrapper_scroll_top.style.transform = 'translateX(100%)'
    //         scroll_top.style.transform = 'translateX(100%)';
    //     }
    //     previous_scroll = current_scroll;
    // });
});