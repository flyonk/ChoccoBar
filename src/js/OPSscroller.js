const sections = $(".section");
const display = $(".maincontent");

let inScroll = false;

sections.first().addClass("active");

const performTransition = sectionEq => {
    if (inScroll == false) {
        inScroll = true;
        const position = sectionEq * -100;

        display.css({
            transform: `translateY(${position}%)`
        });

        sections.eq(sectionEq).addClass("active").siblings().removeClass("active");

        setTimeout(() => {
            inScroll = false;

        }, 1300);
    }
};

const scrollViewport = direction => {
    if (direction == "next" && nextSection.length) {
        const activeSection = section.filter(".active");
        const nextSection = activeSection.next();
        const prevSection = activeSection.prev();

    }

    if (direction == "prev" && prevSection.length) {

    }
}

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;

    if (deltaY > 0) {
        performTransition(nextSection.index());
        scrollViewport("next");
    }

    if (deltaY < 0) {
        performTransition(prevSection.index());
        scrollViewport("prev");
    }
});

$(window).on("keydown", e => {

    const tagName = e.target.tagName.toLowerCase();

    if (tagName != "input" && tagName != "textarea") {
        switch (e.keyCode) {
            case 38: //prev
                scrollViewport("prev");
                break;

            case 40: //next
                scrollViewport("next");
                break;

            default:
                break;
        }
    }

});

$("[data-scroll-to]").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    performTransition(reqSection.index());
});