function click_info(evt) {

  //alert('karan');

  if (featureOverlay) {
    featureOverlay.getSource().clear();
    map.removeLayer(featureOverlay);

    //alert('karan');
  }

  feature = map.forEachFeatureAtPixel(evt.pixel,
    function (feature, layer) {
      return feature;
    });

  var highlightStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255,255,255,0)',
    }),
    stroke: new ol.style.Stroke({
      color: '#3399CC',
      width: 3,
    }),
    image: new ol.style.Circle({
      fill: new ol.style.Fill({
        color: 'rgba(255,255,255,0.7)',
      }),
      stroke: new ol.style.Stroke({
        color: '#3399CC',
        width: 3,
      }),
      radius: 5
    }),
  });
  featureOverlay = new ol.layer.Vector({
    source: new ol.source.Vector(),
    map: map,
    style: highlightStyle
  });


  if (feature) {
    //alert('karan');
    var geometry = feature.getGeometry();
    var coord = geometry.getCoordinates();
    var coordinate = evt.coordinate;
    //alert(coordinate);
    var content1 = '<h5>' + feature.get('brgy').charAt(0).toUpperCase() + feature.get('brgy').slice(1) + '</h5>';
    // content1 += '<h6>' + value_param.charAt(0).toUpperCase() + value_param.slice(1) + ': ' + numberWithCommas(Math.round(feature.get([value_param]))) + '</h6>';
    content1 += '<h6>' + 'Land Area: ' + feature.get('sqkm') + ' Sq. Km.';

    /*  var content1 = '<h3>' + feature.get([name]) + '</h3>';
      content1 += '<h5>' + feature.get('crop')+' '+ value_param +' '+ value_seas+' '+value_level+'</h5>'
      content1 += '<h5>' + feature.get([value_param]) +' '+ unit +'</h5>';*/

    // alert(content1);
    content.innerHTML = content1;
    overlay.setPosition(coordinate);

    // console.info(feature.getProperties());

    featureOverlay.getSource().addFeature(feature);
  }



}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}