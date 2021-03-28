function canShowProceedBtn() {
    var showProceed = true;
    // check if all dice rollable stats have been set and display proceed btn if they have
    $('.form-control').each(function (idx, element) {
        var ndice = Number(element.dataset['dice']);
        var modifier = Number(element.dataset['modifier']);

        if ((ndice > 0 || modifier > 0) && $(element).val() <= 0) {
            showProceed = false;
        }
    });

    return showProceed;
}

$(document).ready(function () {
    var dice = undefined;

    $('#diceBtn').hide();
    $('#proceedBtn').hide();

    $('.form-control').on('change', function () {
        if (canShowProceedBtn())
            $('#proceedBtn').show();
        else
            $('#proceedBtn').hide();
    });




    $('.form-control').on('focus', function (evt) {
        var statCtrl = evt.target;

        // remove previous dice
        $('#diceDiv').empty();

        // get number of dice and stat modifier
        var ndice = Number(statCtrl.dataset['dice']);
        var modifier = Number(statCtrl.dataset['modifier']);

        if (ndice > 0) {
            $('#diceBtn').show();
        }
        else {
            $('#diceBtn').hide();
        }

        // remove event listeners from previous dice
        $(dice).off('rolled');

        // create new dice and write up events
        dice = new Dice(ndice, 500, 'diceDiv');

        $('#diceBtn').on('click', function () {
            dice.rollDice();
        });

        $(dice).on('rolled', function (evt, value) {
            var rolled = value + modifier;
            $(statCtrl).val(rolled);

            if (canShowProceedBtn())
                $('#proceedBtn').show();
            else
                $('#proceedBtn').hide();

            // get next control that can be dice rolled
            var currTabIdx = $(statCtrl).attr('tabindex');

            var nextCtrl = $('.form-control').filter(function () {
                return $(this).attr('tabindex') > currTabIdx;
            }).first();

            if (nextCtrl != undefined) {
                $(nextCtrl).focus();
            }
        });
    });

    $('.form-control').first().each(function () {
        $(this).focus();
    });
    $('input[autofocus]').trigger('focus');//force fire focus on autofocus1
});