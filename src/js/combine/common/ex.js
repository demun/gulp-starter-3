(function () {
    // Swiper, build/ex/swiper.html
    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // bootstrap popover
    $('[data-toggle="popover"]').popover();
}());
