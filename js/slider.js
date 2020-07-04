const slider = $('.slider-block__main-container').bxSlider({
    pager: false,
    controls: false
});

$('.slider-block__arrow--left').click(e => {
    e.preventDefault;

    slider.goToPrevSlide();
});

$('.slider-block__arrow--right').click(e => {
    e.preventDefault;

    slider.goToNextSlide();
});