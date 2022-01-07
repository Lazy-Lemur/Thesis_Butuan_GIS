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
}