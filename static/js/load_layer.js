function load_layer() {
    overlay.setPosition(undefined);
    closer.blur();

    if(featureOverlay){
        featureOverlay.getSource().clear();
        map.removeLayer(featureOverlay);
    }

    if(lineGraph){
        lineGraph.destroy();
    }

    if(barGraph){
        barGraph.destroy();
    }

    if(geojson){
        geojson.getSource().clear();
        overlays.getLayers().remove(geojson);
    }

    if(geojson_point){
        geojson_point.getSource().clear();
        overlays.getLayers().remove(geojson_point);
    }

    var start_date = document.getElementById("start_date").value;
    var end_date = document.getElementById("end_date").value;
    var param = document.getElementById("parameter");
    value_param = param.options[param.selectedIndex].value;
    console.log(typeof(start_date));

    var url_max = "../dbase/bxu_max_value_spatial.jsp";
    url_max += "?parameter="+value_param;

    var url_point = "../dbase/bxu_layer_point_spatial.jsp";
    url_point += "?parameter="+value_param;

    var url_poly = "../dbase/bxu_layer_spatial.jsp";
    url_poly += "?parameter="+value_param;

    $.getJSON(url_max, function(data){
        //alert('karan');
        var max_value = data.maximum[0].max;
        console.log(max_value);
        //alert(max_value);
        
        var diff = max_value/8;
        //alert(diff);
        
        var i;
        var k;
        var color = [[254, 217, 118, 0.7], [254, 178, 76, 0.7], [253, 141, 60, 0.7], [252, 78, 42, 0.7], [227, 26, 28, 0.7], [189, 0, 38, 0.7], [128, 0, 38, 0.7] ];
        
        getStyle1 = function (feature, resolution) {
        
            for (i = 0; i < 7; i++) {
            
                if (feature.get([value_param]) > (i*diff) && feature.get([value_param]) <= ((i+1)*diff)) {
                        return new ol.style.Style({
                            fill: new ol.style.Fill({
                                color: color[i] // semi-transparent red
                            }),
                            stroke: new ol.style.Stroke({
                            color: 'white',
                            lineDash: [2],
                            width: 2
                            })
                        });
                    }
        //alert(i);
                if (value_param == 'population' || value_param == 'employed'){
                    $("#"+i).html(Math.round((i*diff)/1000)+"K - "+Math.round(((i+1)*diff)/1000)+"K");
                
                }
                else{
                    $("#"+i).html(Math.round((i*diff)/1000)+"K - "+Math.round(((i+1)*diff)/1000)+"K");
                }
                    $("#legend_title").html('<b>Legend - Layer1 '+value_param+'</b>');
                }
                if (feature.get([value_param]) == 0) {
                    return new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: [254, 217, 118, 0.7] // semi-transparent red
                        }),
                        stroke: new ol.style.Stroke({
                        color: 'white',
                        lineDash: [2],
                        width: 2
                        })
                    });
                }
        };
            
            var col = 'rgba(255, 255, 0, 0.6)';
            var col1 = 'rgba(255, 0, 0, 0.6)';
            getStyle2 = function (feature, resolution) {
            
            
            
            var txt = new ol.style.Text({
                text: feature.get('barangay')+":"+feature.get([value_param]),
                offsetX: 20,
                offsetY: -15,
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({
                color: '#000'
                }),
                stroke: new ol.style.Stroke({
                color: '#fff',
                width: 3
                })
            });
        
            var fill = new ol.style.Fill({color: col});
            var stroke = new ol.style.Stroke({color: col1, width: 1});
            
            
            
            for (i = 0; i < 7; i++) {
            
            if (feature.get([value_param]) > (i*diff) && feature.get([value_param]) <= ((i+1)*diff)) {
                return new ol.style.Style({
                    image: new ol.style.Circle({
                    radius: 5*(i+1),
                    fill: fill,
                    stroke: stroke
                    }),
                //	text: txt
                        
                    });
                }
            //alert(i);
            
            }
            if (feature.get([value_param]) == 0) {
            return new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 0,
                        fill: fill,
                        stroke: stroke
                    }),
                        //text: txt
                        
                });
            }
    
        };
    
    });

    geojson = new ol.layer.Vector({
        title: 'Layer 1 '+value_param+'('+start_date+' to '+end_date+')',
            source: new ol.source.Vector({
            url: url_poly,
            format: new ol.format.GeoJSON()
            }),
            style: function (feature, resolution) {
                return getStyle1(feature, resolution);
            }
    });
           
    geojson.getSource().on('addfeature', function(){
        map.getView().fit(
           geojson.getSource().getExtent(),
           { duration: 000, size: map.getSize() }
        );
    });
    
    overlays.getLayers().push(geojson);
           //map.addLayer(geojson);		
    layerSwitcher.renderPanel();
    geojson_point = new ol.layer.Vector({
        title: 'Layer '+value_param+'('+start_date+' to '+end_date+')_circle',
             source: new ol.source.Vector({
                url: url_point,
             format: new ol.format.GeoJSON()
             }),
             style: function (feature, resolution) {
                return getStyle2(feature, resolution);
            }
    });
           
    geojson_point.getSource().on('addfeature', function(){
       map.getView().fit(
           geojson_point.getSource().getExtent(),
           { duration: 000, size: map.getSize() }
       );
    });
           
    overlays.getLayers().push(geojson_point);
           //map.addLayer(geojson_point);
    layerSwitcher.renderPanel();

    var url_bxu_year_cumalative = "../dbase/bxu_butuan_cumulative_per_year.jsp";
    url_bxu_year_cumulative += "?parameter="+value_param;

    $.getJSON(url_bxu_year_cumulative, function(data){
        var date = [];
                var score = [];
                var date_to_score = Object();
                var score1 = [];
                var score2 = [];
                for(var i in data) {
                    date.push(data[i].year);
                    score.push(data[i][value_param]);
                    console.log(score);
                    date_to_score[data[i].year] = data[i][value_param];
                    //score1.push(data[i].production);
                    //score2.push(data[i].yield);
                    //alert(i);
                   
                }
                date.sort(function(a,b){
                    a = a.split('-').reverse().join('');
                    b = b.split('-').reverse().join('');
                    return a > b ? 1 : a < b ? -1 : 0;
                })
                console.log(score);
                // date = date.map(date => new Date(date));
                
                var chartdata = {
                    labels: date,
                    datasets : [
                        {
                            label: 'Butuan '+value_param,
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
                    type: 'bar',
                    data: chartdata,
                    options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                    title: {
                        display: true,
                        text: 'Butuan '+value_param+' (2020)'
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
                                text: 'Date'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Butuan '+value_param
                            },
                                 ticks: {
                    beginAtZero: true
                       }
                        }
                    }
                }
                    
                });
    })
}

