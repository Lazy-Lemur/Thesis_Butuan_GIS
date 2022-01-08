function click_graph(evt){
    if(lineGraph){
        lineGraph.destroy();
    }

    if(barGraph){
        barGraph.destroy();
    }

    feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature, layer){
            return feature;
    });

    if(feature){
        var brgy_name = feature.get('brgy');
        var start_date = document.getElementById("start_date").ariaValueMax;
        var end_date = document.getElementById("end_date").value;
        var param = document.getElementById("parameter");
        var year = 2015;

        // start_date = convert_format(start_date);
        // end_date = convert_format(end_date);

        value_param = param.options[param.selectedIndex].value;

        var url_brgy_cumulative_per_year = "static/dbase/graph_brgy_cumulative_per_year.jsp";
        url_brgy_cumulative_per_year += "?parameter="+value_param;
        url_brgy_cumulative_per_year += "&brgy="+brgy_name;
        url_brgy_cumulative_per_year += "&year="+year;

        $.getJSON(url_brgy_cumulative_per_year, function(data){
            var date = [];
            var score = [];
            var score1 = [];
            var score2 = [];
            for(var i in data) {
                date.push(data[i].year);
                score.push(data[i][value_param]);
                console.log(date[0].date);
                //score1.push(data[i].production);
                //score2.push(data[i].yield);
                //alert(i);
            }

            date.sort(function(a,b){
                a = a.split('-').reverse().join('');
                b = b.split('-').reverse().join('');
                return a > b ? 1 : a < b ? -1 : 0;
            });

            var chartdata = {
                labels: date,
                datasets : [
                    {
                        label: brgy_name+' '+value_param + ' Density',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgb(153, 102, 255)',
                        borderWidth: 1,
                        // hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
                        // hoverBorderColor: 'rgba(200, 200, 200, 1)',
                        data: score,
                        fill: false
                    
                    }
                ]
            };

            var ctx = $("#mycanvas2");
            // var ctx = document.getElementById('#mycanvas');
                lineGraph = new Chart(ctx, {
                type: 'bar',
                data: chartdata,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: {
                        title: {
                            display: true,
                            text: brgy_name+' - Cumulative Density of '+value_param+'('+year+')'
                        }
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: value_param + " Density"
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    }
                }
                
            });
        });

        var url_brgy_variable_sum_per_year = "static/dbase/graph_brgy_variable_sum_per_year.jsp";
        // url_brgy_variable_sum_per_year += "?parameter="+value_param;
        url_brgy_variable_sum_per_year += "?brgy="+brgy_name;
        url_brgy_variable_sum_per_year += "&year="+year;

        $.getJSON(url_brgy_variable_sum_per_year, function(data){
            var date = [];
            var population_score = [];
            var employed_score = [];
            var unemployed_score = [];
            var underemployed_score = [];
            var score = [];
            var keys = Object.keys(data);

            score.push(data[0].population);
            score.push(data[0].employed);
            score.push(data[0].unemployed);
            score.push(data[0].underemployed);

            // for(var key in data) {
            //     if(!data.hasOwnProperty(key))
            //     date.push(data[i].year);
            //     population_score.push(data[i][population]);
            //     employed_score.push(data[i][employed]);
            //     unemployed_score.push(data[i][unemployed]);
            //     underemployed_score.push(data[i][underemployed]);
            //     // score.push(data[i][value_param]);
            //     //score1.push(data[i].production);
            //     //score2.push(data[i].yield);
            //     //alert(i);
            //     console.log(date);
            // }

            // Object.entries(data).forEach(([key, value]) => {
            //     if(data[key].value > 2015){
            //         score.push(data[key]);
            //     }
            // });
            console.log(score);

            console.log(data);
            date.sort(function(a,b){
                a = a.split('-').reverse().join('');
                b = b.split('-').reverse().join('');
                return a > b ? 1 : a < b ? -1 : 0;
            });

            var chartdata = {
                labels: ['Population', 'Employed', 'Unemployed', 'Underemployed'],
                datasets : [
                    {
                        label: brgy_name + ' Compound Density',
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)'
                        ],
                        borderWidth: 1,
                        // hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
                        // hoverBorderColor: 'rgba(200, 200, 200, 1)',
                        data: score,
                        fill: false
                    
                    }
                ]
            };

            var ctx = $("#mycanvas1");
          // var ctx = document.getElementById('#mycanvas');
             barGraph = new Chart(ctx, {
                type: 'bar',
                data: chartdata,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: {
                        title: {
                            display: true,
                            text: brgy_name+' Compound Density ('+year+')'
                        }
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Variable'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text:  'Density'
                            },
                            ticks: {
                                 beginAtZero: true
                            }
                        }
                    }
                }
                
            });

        });

        var url_counter_brgy = "static/dbase/bxu_counter_brgy.jsp";
        url_counter_brgy += "?year="+year;
        url_counter_brgy += "&brgy="+brgy_name;

        $.getJSON(url_counter_brgy, function(data){
            $("#cases").html('Cases: '+Math.round(data[0].cases));
            $("#deaths").html('Deaths: '+Math.round(data[0].deaths));
            $("#tests").html('Tests: '+Math.round(data[0].tests));
            $("#vaccinations").html('Vaccinations: '+Math.round(data[0].vaccinations));
        });
    }
    else{load_layer();}
}

// function convert_format(dt){
//     dt_arr = dt.split('-');
//     return (dt_arr[2] + '-' + dt_arr[1] + '-' + dt_arr[0]);
// }