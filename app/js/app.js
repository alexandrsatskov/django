document.addEventListener("DOMContentLoaded", function() {
    const
        acc = document.getElementsByClassName("question__heading"),
        hamburger_menu = document.getElementById('js-hamburger'),
        hamburger_menu_wrapper = document.getElementById('js-hamburger-wrapper');


    // HAMBURGER
    hamburger_menu_wrapper.addEventListener('click', () => {

        hamburger_menu.classList.toggle('animate')
        document.querySelector('.header__menu').classList.toggle('active')
        document.body.classList.toggle('blackout')
        document.body.classList.toggle('scroll-lock')
    });


    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            let panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
});