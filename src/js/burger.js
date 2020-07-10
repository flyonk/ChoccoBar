const burger = document.querySelector(".burger");
const menu = document.querySelector(".burger-menu");
const close = document.querySelector(".close");

burger.addEventListener('click', function (e) {
    e.preventDefault();
    
    menu.classList.add('burger-menu_opened');
});

menu.addEventListener('click', function (e) {
    if (!e.target.classList.contains('menu__item') || e.target.classList.contains('close')) {
        menu.classList.remove('burger-menu_opened');
    }

    if (e.target.classList.contains('menu__item')) {
        menu.classList.remove('burger-menu_opened');
    }

});