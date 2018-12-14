$(document).ready(function () {
    $.ajax( '/pieChartData', {
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          var amounts = [];
          var types = [];
          var colors = [];
          data.forEach(elem => {
            amounts.push(elem.amount);
            types.push(elem.type);
          });

          for (var i = 0; i < types.length; i++) {
              colors.push(getRandomRgb());
          }
          var data = getPieChartData(amounts, types, colors);
          var options = getDonutOptions();
          createPieChart(data, options);
        },
        error: function( req, status, err ) {
          console.log( 'something went wrong', status, err );
        }
    });

    $.ajax( '/pieChartData', {
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var amounts = [];
            var types = [];
            var colors = [];
            data.forEach(elem => {
                amounts.push(elem.amount);
                types.push(elem.type);
            });

            for (var i = 0; i < types.length; i++) {
                colors.push(getRandomRgb());
            }
            var data = getBarChartData(amounts, types, colors);
            var options = getBarChartOptions();
            createBarChart(data, options);
        },
            error: function( req, status, err ) {
            console.log( 'something went wrong', status, err );
        }
        });
});

function getPieChartData(data, types, colors) {
   return { datasets: [{
        data: data,
        backgroundColor: colors,
        borderColor: colors,
      }],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: types
    }
}

function getBarChartOptions() {
    return {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          }
        }
    }
}

function getDonutOptions() {
    return {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true
        }
    }
}

function createPieChart(data, options) {
    if ($("#pieChart").length) {
        var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
        var pieChart = new Chart(pieChartCanvas, {
          type: 'pie',
          data: data,
          options: options
        });
    }
}

function getBarChartData(data, labels, colors) {
    return {
        labels: labels,
        datasets: [{
          label: 'Amount of money spent this month',
          data: data,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1
        }]
      }
}

function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

function createBarChart(data, options) {
    // Get context with jQuery - using jQuery's .get() method.
    if ($("#barChart").length) {
        var barChartCanvas = $("#barChart").get(0).getContext("2d");
        // This will get the first returned node in the jQuery collection.
        var barChart = new Chart(barChartCanvas, {
        type: 'bar',
        data: data,
        options: options
        });
    }
}