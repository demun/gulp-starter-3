(function () {
    var selectTarget = $('.selectbox select');

    selectTarget.on({
        'focus': function () {
            $(this).parent().addClass('focus');
        },
        'blur': function () {
            $(this).parent().removeClass('focus');
        }
    });

    selectTarget.change(function () {
        var select_name = $(this).children('option:selected').text();
        $(this).siblings('label').text(select_name).addClass('on');
        $(this).parent().addClass('on');
    });
}());
