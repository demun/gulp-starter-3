(function () {
    $('._droplink').on('click', function () {
        var target = $(this).data('link');

        if ($('#' + target).css('display') === 'none') {
            $('#' + target).slideDown(200);
            $(this).removeClass('down').addClass('up');
        } else {
            $('#' + target).slideUp(200);
            $(this).removeClass('up').addClass('down');
        }
    });
}());
