

var team = document.querySelector('.team-block__content');
// var description = document.querySelector('.team-block__description');
team.addEventListener('click', function (e) {
    var openedName = document.querySelector('.description-opened');
        if (e.target.classList.contains('team-block__name')) {
            if (e.target.classList.contains('description-opened')) {
                e.target.classList.remove('description-opened');
            } else {
                if (openedName) {
                    openedName.classList.remove('description-opened');
                }
                e.target.classList.add('description-opened');
            }
        }

});














// var team = document.querySelector('.team');
// team.addEventListener('click', function (e) {
//     // при клике на блок с командой ищем есть ли открытое имя
//     var openedName = document.querySelector('.team__name.opened');
//     // проверяем, кликнули ли мы по имени
//     if (e.target.classList.contains('team__name')) {
//         // если мы кликнули по имеин и имя является открытым
//         if (e.target.classList.contains('opened')) {
//             // закрываем это имя
//             e.target.classList.remove('opened');
//         } else {
//             // если мы кликнули по имеин и имя является закрытым
//             // смотрим, нет ли других открытых имен
//             if (openedName) {
//                 // и если есть открытое имя, мы его закрываем
//                 openedName.classList.remove('opened');
//             }
//             // а потом на то имя, по которму кликнули добавляем открытие
//             e.target.classList.add('opened');
//         }
//     }
// });