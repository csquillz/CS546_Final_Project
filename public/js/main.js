$(document).ready(function () {
    var name = $('#loggedInName').val();
    let finalName = name.charAt(0).toUpperCase() + name.slice(1);
    $('.nametitle').text("Welcome, " + finalName + "!");

    $('.logout-btn').css('display', 'block');

    $('#goalSubmit').click(function() {
        let data = {
            type: $('#inputGoalType').val(),
            amount: $('#inputGoalAmount').val(),
            month: $('#inputGoalMonth').val()
        };

        console.log(JSON.stringify(data));

        $.ajax({
            type: 'POST',
            url: '/goal',
            data: data,
            dataType: 'json'
        });
    });

    $('#transactionSubmit').click(function() {
        let data = {
            type: $('#inputTransactionType').val(),
            amount: $('#inputTransactionAmount').val(),
            month: $('#inputTransactionDate').val(),
            description: $('#inputTransactionDescription').val()
        };

        console.log(JSON.stringify(data));

        $.ajax({
            type: 'POST',
            url: '/transHistory',
            data: data,
            dataType: 'json'
        });
    });
});
