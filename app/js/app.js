document.addEventListener("DOMContentLoaded", function() {
    const
        help = document.querySelectorAll(".faq__item-heading"),
        hamburger_menu = document.querySelector('.hamburger__inner'),
        hamburger_menu_wrapper = document.querySelector('.hamburger'),
        header_menu = document.querySelector('.header__menu'),
        ranges = document.querySelectorAll("input[type='range']"),
        overlay = document.querySelector(".overlay"),
        scroll_top = document.querySelector('.go-top__inner'),
        wrapper_scroll_top = document.querySelector('.go-top__inner'),
        filters = document.querySelector('.filters'),
        filters_heading = document.querySelector('.filters__heading'),
        filters_content = document.querySelector('.filters__content'),
        sort = document.querySelector('.sort'),
        increments = document.querySelectorAll('.fa-plus'),
        decrements = document.querySelectorAll('.fa-minus');

    if (increments !== null) {
        for (let i = 0; i < increments.length; i++) {
            increments[i].addEventListener('click', function(event) {
                increments[i].nextElementSibling.value =
                    (+increments[i].nextElementSibling.value + 1).toString();
            });
            decrements[i].addEventListener('click', function(event) {
                decrements[i].previousElementSibling.value =
                    (+decrements[i].previousElementSibling.value - 1).toString();
            });
        }
    }

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
        });
    }

    // FILTERS
    if (filters !== null) {
        for (let i = 0; i < ranges.length; i++) {
            ranges[i].addEventListener("input", function() {
                let content = this.parentElement.querySelector(".filters__item-content");
                content.innerHTML = this.value;
            });
        }
        filters_heading.addEventListener('click', function() {
            window.scrollTo(0, 0)
            overlay.classList.toggle('overlay--show')
            document.body.classList.toggle('body--scroll-lock')
            hamburger_menu.classList.toggle('hamburger--animate')
            filters_content.classList.toggle('filters__content--active')
        });
    }

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
    wrapper_scroll_top.addEventListener('click', () => {
        window.scrollTo(0, 0);
    });
    let previous_scroll = 0, transform_clear;
    window.addEventListener('scroll', () => {
        let current_scroll = window.pageYOffset
        if (window.pageYOffset > 155) {
            wrapper_scroll_top.style.transform = 'translateX(0)'
            if ((current_scroll - previous_scroll) <= -100) {

                scroll_top.style.transform = 'translateX(0)';
                clearTimeout(transform_clear)
                transform_clear = setTimeout(() => {
                    scroll_top.style.transform = 'translateX(100%)'
                }, 3000)
            }
        }
        else {
            wrapper_scroll_top.style.transform = 'translateX(100%)'
            scroll_top.style.transform = 'translateX(100%)';
        }
        previous_scroll = current_scroll;
    });
});