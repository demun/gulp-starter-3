// c.js
(function () {
    // console.log('c.js');
}());

/* ex.js */

(function () {
    // Swiper, build/ex/swiper.html
    // eslint-disable-next-line no-console
    console.log('exampleJs');

    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar'
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });

    // bootstrap popover
    $('[data-toggle="popover"]').popover();
}());
