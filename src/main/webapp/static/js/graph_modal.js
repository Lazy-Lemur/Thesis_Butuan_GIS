$(document).ready(function() {
    var year = parseInt($('#yearPicker').val());
    var param = document.getElementById("parameter");
    var value_param = param.options[param.selectedIndex].value;

    $('#gr_pop1').click(function() {
        $('#modal-container1').removeAttr('class').addClass('show');
        $('#modal-canvas1').removeAttr('class');
        $('#modal-canvas1').addClass('zoomIn');
        $('body').addClass('modal-active'); 
     
        var url_bxu_year_cumulative = "static/dbase/graph_butuan_class_cumulative_per_year.jsp";
         url_bxu_year_cumulative += "?parameter=" + value_param;
         url_bxu_year_cumulative += "&year=" + year;
     
         $.getJSON(url_bxu_year_cumulative, function (data) {
             var date = [];
             var score = [];
             var brgy_class = [];
             var date_to_score = Object();
             var score1 = [];
             var score2 = [];
             console.log(data[0][value_param]);
             for (var i in data) {
                 date.push(data[i].year);
                 brgy_class.push(data[i].class);
                 score.push(data[i][value_param]);
                 console.log(data[i][value_param]);
                 date_to_score[data[i].year] = data[i][value_param];
             }
             date.sort(function (a, b) {
                 a = a.split('-').reverse().join('');
                 b = b.split('-').reverse().join('');
                 return a > b ? 1 : a < b ? -1 : 0;
             })
             console.log(score);
             // date = date.map(date => new Date(date));
     
             var chartdata = {
                 labels: brgy_class,
                 datasets: [
                     {
                         label: 'Butuan ' + value_param.charAt(0).toUpperCase() + value_param.slice(1) + ' by Class (' + year + ')',
                         backgroundColor: [
                             'rgba(255, 99, 132, 0.2)',
                             'rgba(54, 162, 235, 0.2)'
                         ],
                         borderColor: [
                             'rgb(255, 99, 132)',
                             'rgb(54, 162, 235)'
                         ],
                         hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
                         hoverBorderColor: 'rgba(200, 200, 200, 1)',
                         data: score,
                         fill: false
     
                     }
                 ]
             };
     
             var ctx = $("#gis_graph1");
             // var ctx = document.getElementById('#mycanvas');
             lineGraph = new Chart(ctx, {
                 type: 'doughnut',
                 data: chartdata,
                 options: {
                     responsive: true,
                     maintainAspectRatio: false,
                     plugins: {
                         title: {
                             display: true,
                             text: 'Butuan ' + value_param.charAt(0).toUpperCase() + value_param.slice(1) + ' by Class (' + year + ')'
                         }
                     },
                     tooltips: {
                         mode: 'index',
                         intersect: false,
                     },
                     scales: {
                         // xAxes: [{
                         //     type: 'time',
                         //     distribution: 'linear'
                         // }],
                         x: {
                             display: true,
                             title: {
                                 display: true,
                                 text: 'Barangay Class'
                             }
                         },
                         y: {
                             display: true,
                             title: {
                                 display: true,
                                 // text: 'Butuan '+value_param+' '
                                 text: 'Density'
                             },
                             ticks: {
                                 beginAtZero: true
                             }
                         }
                     }
                 }
     
             });
         });
     
     });
     
     $('#close1').click(function (){
         $('#modal-canvas1').addClass('out');
         $('#modal-container1').addClass('out');
         $('body').removeClass('modal-active');
     });
     
     $('#gr_pop2').click(function() {
         $('#modal-container2').removeAttr('class').addClass('show');
         $('#modal-canvas2').removeAttr('class');
         $('#modal-canvas2').addClass('zoomIn');
         $('body').addClass('modal-active'); 
     
         var url_variable_brgy = "static/dbase/graph_variable_brgy.jsp";
         url_variable_brgy += "?parameter=" + value_param;
         url_variable_brgy += "&year=" + year;
     
         $.getJSON(url_variable_brgy, function (data) {
             var date = [];
             var score = [];
             var brgy = []
             var score1 = [];
             var score2 = [];
             for (var i in data) {
                 // date.push(data[i].year);
                 score.push(data[i][value_param]);
                 brgy.push(data[i].brgy);
                 //score1.push(data[i].production);
                 //score2.push(data[i].yield);
                 //alert(i);
             }
     
             date.sort(function (a, b) {
                 a = a.split('-').reverse().join('');
                 b = b.split('-').reverse().join('');
                 return a > b ? 1 : a < b ? -1 : 0;
             });
     
             var chartdata = {
                 labels: brgy,
                 datasets: [
                     {
                         // label: 'COVID '+value_param,
                         label: 'Barangay ' + value_param.charAt(0).toUpperCase() + value_param.slice(1) + ' Density',
                         backgroundColor: 'rgba(75, 192, 192, 0.2)',
                         borderColor: 'rgb(75, 192, 192)',
                         borderWidth: 1,
                         // hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
                         // hoverBorderColor: 'rgba(200, 200, 200, 1)',
                         data: score,
                         fill: false
     
                     }
                 ]
             };
     
             var ctx = $("#gis_graph2");
             // var ctx = document.getElementById('#mycanvas');
             barGraph = new Chart(ctx, {
                 type: 'bar',
                 data: chartdata,
                 options: {
                     responsive: true,
                     maintainAspectRatio: false,
                     plugins: {
                         title: {
                             display: true,
                             text: 'Butuan ' + value_param.charAt(0).toUpperCase() + value_param.slice(1) + ' Density Per Barangay'
                         }
                     },
                     tooltips: {
                         mode: 'index',
                         intersect: false,
                     },
                     scales: {
                         // xAxes: [{
                         //     type: 'time',
                         //     distribution: 'linear'
                         // }],
                         x: {
                             display: true,
                             title: {
                                 display: true,
                                 text: 'Barangay'
                             }
                         },
                         y: {
                             display: true,
                             title: {
                                 display: true,
                                 text: 'Density'
                             },
                             ticks: {
                                 beginAtZero: true
                             }
                         }
                     }
                 }
     
             });
         });
      });
      
      $('#close2').click(function (){
          $('#modal-canvas2').addClass('out');
          $('#modal-container2').addClass('out');
          $('body').removeClass('modal-active');
      });
      
});

