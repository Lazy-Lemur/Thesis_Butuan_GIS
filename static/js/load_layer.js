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

}

