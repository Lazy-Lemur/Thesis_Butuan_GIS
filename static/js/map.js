var geojson, geojson_point, map;
var lineGraph, barGraph;
var overlay, featureOverlay, feature;
var value_param;

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the layers floater to the map
 */
ovarlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});

/**
 * Add a click handler to hide the layer floater
 */
closer.onclick = function(){
    overlay.setPosition(undefined);
    closer.blur();
    return false;
}

$("#parameter" ).change(function () {
	load_layer();
});



$("#start_date" ).change(function () {
load_layer();
});


$("#end_date" ).change(function () {
load_layer();
});
