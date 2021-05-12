document.addEventListener("DOMContentLoaded", function() {
    const
        help = document.querySelectorAll(".faq__item-heading"),
        hamburger_menu = document.querySelector('.hamburger__inner'),
        hamburger_menu_wrapper = document.querySelector('.hamburger'),
        ranges = document.querySelectorAll("input[type='range']"),
        scroll_top = document.querySelector('.go-top__inner'),
        wrapper_scroll_top = document.querySelector('.go-top__inner'),
        filters_heading = document.querySelector('.filters__heading'),
        filters = document.querySelector('.filters');

    // FILTERS
    // for (let i = 0; i < ranges.length; i++) {
    //     ranges[i].addEventListener("input", function() {
    //         let content = this.parentElement.querySelector(".filter__content");
    //         console.log(content)
    //         content.innerHTML = this.value;
    //     });
    // }
    // filters_heading.addEventListener('click', function() {
    //     hamburger_menu.classList.toggle('animate')
    //     filters.classList.toggle('filters_active')
    //     document.querySelector(".overlay").classList.toggle('show')
    //     document.body.classList.toggle('scroll-lock')
    // });

    // HAMBURGER
    hamburger_menu_wrapper.addEventListener('click', () => {

        if (hamburger_menu.classList.contains('animate')) {
            filters.classList.remove('filters_active')
            document.querySelector('.header__menu').classList.remove('active')
            document.querySelector(".overlay").classList.remove('show')
            document.body.classList.remove('scroll-lock')
        } else {
            filters.classList.add('filters_active')
            document.querySelector('.header__menu').classList.add('active')
            document.querySelector(".overlay").classList.add('show')
            document.body.classList.add('scroll-lock')

        }

        hamburger_menu.classList.toggle('animate')
    });
    document.querySelector(".overlay").addEventListener('click', function() {
        hamburger_menu.classList.remove('animate')
        document.querySelector('.header__menu').classList.remove('active')
        document.querySelector(".overlay").classList.remove('show')
        document.body.classList.remove('scroll-lock')
        filters.classList.remove('filters_active')
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