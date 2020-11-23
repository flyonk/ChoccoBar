// const ul = $('.features-list__item');
// const popup = $('.popup');
// const section = $('.upper-block');
// const close2 = document.createElement("a");

// ul.on('click', function (e) { 

//    let currentText = $(this).children('.features-list__text').text();
//    popup.css('display', 'block');
//    let copyText = $(this).children('.features-list__text').clone()
//    console.log(currentText);
//    copyText.appendTo(popup);



//  });


const why = $('.whychocco');
const reasonItem = $('.reason-item__text-container');
console.log(reasonItem);


why.on("click", function (e) {
    let currentTarget = $(this);
    let currentText = currentTarget.text();
    let result = reasonItem.children('.reason-item__text').toggleClass('HAHAH');
    let target = e.target;
    console.log(result);
    
})

