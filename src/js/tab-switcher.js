const findBlockByAlias = (alias) => {
    return $(".reviews__item").filter((ndx, item) => {
        return $(item).attr("data-linked-with") == alias
    });
    
};

$(".interactive-avatar__link").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlockByAlias(target);
    const curITem = $this.closest(".interactive-avatar");
    // const curImg = $this.("team-block__name-button");

    itemToShow.addClass('reviews__item-active').siblings().removeClass('reviews__item-active');
    // curImg.addClass('arrow-active').siblings().removeClass('arrow-active');
    curITem.addClass('active').siblings().removeClass('active');
    

});






// TAB SWITCHER FOR ACCORDEON


function Accordeon (someclass) {
    const acco = document.querySelector(someclass);
    const items = acco.querySelector('[data-list]').children; //ищем весь <ul>

    acco.addEventListener('click', function(event) {
        event.preventDefault();
        const target = event.target.closest('[data-trigger]');
        console.log(event.target);

        if (!event.target.classList.contains('accordeon-item__trigger') 
            && !event.target.classList.contains('accordeon-item__title') 
            && !event.target.classList.contains('accordeon-item__close')) return;
        
        const item = target.parentNode; //родитель



        if (target.classList.contains('accordeon-list__item-active')) {
            target.classList.remove('accordeon-list__item-active');
        } else {
            for (let i = 0; i < items.length; i++) {
                items[i].classList.remove('accordeon-list__item-active');
                
            }

            target.classList.add('accordeon-list__item-active');
        }
    }); 
}

new Accordeon('#acc-menu');


// $(".accordeon-list__item").click(e => {
//    e.preventDefault();

//    const $this = $(e.currentTarget);
//    const target = $this.attr("data-opened");
//    const itemToShow = findBlockByAlias2(target);
//    const curITem = $this.closest(".accordeon-list__item");
//    console.log($this);
// });