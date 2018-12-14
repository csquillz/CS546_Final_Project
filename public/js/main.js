$(document).ready(function () {
    var name = $('#loggedInName').val();
    let finalName = name.charAt(0).toUpperCase() + name.slice(1);
    $('.nametitle').text("Welcome, " + finalName + "!");

    $('.logout-btn').css('display', 'block');

    $('.progress-bar').each(function() {
        let width = $(this).attr('id');
        if (width > 79) {
            $(this).addClass('bg-danger');
        } else if (width > 39) {
            $(this).addClass('bg-warning');
        } else {
            $(this).addClass('bg-success');
        }
    });

    $('#goalSubmit').click(function() {
        let data = {
            type: $('#inputGoalType').val(),
            amount: $('#inputGoalAmount').val(),
            month: $('#inputGoalMonth').val()
        };

        $.ajax({
            type: 'POST',
            url: '/goal',
            data: data,
            dataType: 'json'
        });

        $.ajax({
            type: 'GET',
            url: '/private',
            data: data
        }).done(function(){
            window.location = window.location;
        });

        $('#goalModal').modal('hide');
    });

    $('#goalModal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
    });

    $('#transactionSubmit').click(function() {
        let data = {
            type: $('#inputTransactionType').val(),
            store: $('#inputTransactionStore').val(),
            amount: $('#inputTransactionAmount').val(),
            date: $('#inputTransactionDate').val(),
            description: $('#inputTransactionDescription').val()
        };

        $.ajax({
            type: 'POST',
            url: '/transHistory',
            data: data,
            dataType: 'json'
        });

        $.ajax({
            type: 'GET',
            url: '/private',
            data: data
        }).done(function(){
            window.location = window.location;
        });

    });

    $('#transactionModal').on('hidden.bs.modal', function () {
        $(this).find('form').trigger('reset');
    })
});
