var geojson, geojson_point, map;
var lineGraph, barGraph;
var value_param;
var overlay, featureOverlay, feature;

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});

/**
 * Add a click handler to hide the popup
 */
closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
}

$('#parameter').change(function () {
    load_layer();
});


$('#yearPicker').keyup(function (e) {
    if (e.key == 'Enter') {
        load_layer();
    }
});

var view = new ol.View({
    projection: 'EPSG:4326',
    center: [82.00, 23.00],
    zoom: 10,
    minZoom: 10,
    maxZoom: 14
});

var view_ov = new ol.View({
    projection: 'EPSG:4326',
    center: [82.00, 23.00],
    zoom: 5,
    minZoom: 10,
    maxZoom: 14
});

var OSM = new ol.layer.Tile({
    title: 'OSM',
    type: 'base',
    visible: true,
    source: new ol.source.OSM()
});

var Satellite = new ol.layer.Tile({
    title: 'Satellite',
    type: 'base',
    visible: true,
    source: new ol.source.XYZ({
        attributions: ['Powered by Esri',
            'Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
        ],
        attributionsCollapsible: false,
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        maxZoom: 22
    })
});

var base_maps = new ol.layer.Group({
    'title': 'Base Map',
    layers: [OSM, Satellite]
});

var overlays = new ol.layer.Group({
    'title': 'Overlays',
    layers: []
});

map = new ol.Map({
    target: 'map',
    view: view,
    overlays: [overlay]
});

map.addLayer(base_maps);
map.addLayer(overlays);

var layerSwitcher = new ol.control.LayerSwitcher({
    activationMode: 'click',
    startActive: false,
    tipLabel: 'Layers',
    groupSelectStyle: 'children',
    collapseTipLabel: 'Collapse Layers',
});

map.addControl(layerSwitcher);

var mouse_position = new ol.control.MousePosition();
var overview = new ol.control.OverviewMap({ view: view_ov, collapseLabel: 'O', label: 'O' });
var full_sc = new ol.control.FullScreen({ label: 'F' });
var zoom = new ol.control.Zoom({ zoomInLabel: '+', zoomOutLabel: '-' });
var slider = new ol.control.ZoomSlider();

map.addControl(mouse_position);
map.addControl(overview);
map.addControl(full_sc);
map.addControl(zoom);
map.addControl(slider);

var zoom_ex = new ol.control.ZoomToExtent({
    extent: [
        65.9512481689453, 5.96124982833862,
        101.048751831055, 39.0387496948242
    ]
});

map.addControl(zoom_ex);

load_layer();

map.on('click', function (evt) {
    click_info(evt);
    click_graph(evt);
});
