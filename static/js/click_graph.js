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
        var brgy_name = feature.get('barangay');
        var start_date = document.getElementById("start_date").ariaValueMax;
        var end_date = document.getElementById("end_date").value;
        var param = document.getElementById("parameter");
        var year = 2015;

        start_date = convert_format(start_date);
        end_date = convert_format(end_date);

        value_param = param.options[param.selectedIndex].value;

        var url_brgy_cumulative_per_year = "static/dbase/bxu_brgy_cumulative_per_year.jsp";
        url_brgy_cumulative_per_year += "?parameter="+value_param;
        url_brgy_cumulative_per_year += "&brgy="+brgy_name;

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
                        label: 'COVID '+value_param,
                        backgroundColor: 'rgba(255, 0, 0, 1)',
                        borderColor: 'rgba(255, 0, 0, 1)',
                        hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
                        hoverBorderColor: 'rgba(200, 200, 200, 1)',
                        data: score,
                        fill: false
                    
                    }
                ]
            };

            var ctx = $("#mycanvas1");
            // var ctx = document.getElementById('#mycanvas');
                lineGraph = new Chart(ctx, {
                type: 'line',
                data: chartdata,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: country_name+' - Cumulative COVID '+value_param+'('+start_date+' to '+end_date+')'
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
                                text: 'COVID '+value_param
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    }
                }
                
            });
        });

        var url_brgy_variable_sum_per_year = "statis/dbase/bxu_brgy_variable_sum_per_year.jsp";
        url_brgy_variable_sum_per_year += "?parameter="+value_param;
        url_brgy_variable_sum_per_year += "&year="+year;

        $.getJSON(url_brgy_variable_sum_per_year, function(data){
            var date = [];
            var score = [];
            var score1 = [];
            var score2 = [];
            for(var i in data) {
                date.push(data[i].date);
                score.push(data[i][value_param]);
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
                        label: 'Butuan - '+brgy_name+' '+value_param,
                        backgroundColor: 'rgba(255, 0, 0, 1)',
                        borderColor: 'rgba(255, 0, 0, 1)',
                        hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
                        hoverBorderColor: 'rgba(200, 200, 200, 1)',
                        data: score,
                        fill: false
                    
                    }
                ]
            };

            var ctx = $("#mycanvas2");
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
                            text: country_name+' - Daily COVID '+value_param+'('+start_date+' to '+end_date+')'
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
                                text: 'COVID '+value_param
                            },
                            ticks: {
                                 beginAtZero: true
                            }
                        }
                    }
                }
                
            });

        });

        var url_counter_brgy = "static/dbase/bxu_country_brgy.jsp";
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

function convert_format(dt){
    dt_arr = dt.split('-');
    return (dt_arr[2] + '-' + dt_arr[1] + '-' + dt_arr[0]);
}