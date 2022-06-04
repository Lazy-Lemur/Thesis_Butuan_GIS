function click_info(evt) {

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
    
    var url_data_click_info = "static/dbase/fetch_brgy_data_click_info.jsp";
    url_data_click_info += "?param=" + (feature.get('brgy').charAt(0).toUpperCase() + feature.get('brgy').slice(1));
//    url_data_click_info += "&year=" + year;
    $.getJSON(url_data_click_info, function (data){
    	var geometry = feature.getGeometry();
    	var coord = geometry.getCoordinates();
    	var coordinate = evt.coordinate;
    	
    	var content1 = '<h5 style="font-size:15px;">' + feature.get('brgy').charAt(0).toUpperCase() + feature.get('brgy').slice(1) + '</h5>';
    	content1 += '<div class="bubble-info" style="text-align: left; line-height: 0.1; width: fit-content; margin: auto;">'
    	content1 += '<p style="font-size:13px;">' + 'Land Area: ' + feature.get('sqkm') + ' km<sup>2</sup>' + '</p>';
    	content1 += '<p style="font-size:13px;">' + 'Population: ' + data[0].population + '</p>';
    	content1 += '<p style="font-size:13px;">' + 'Employed: ' + data[0].employed + '</p>';
    	content1 += '<p style="font-size:13px;">' + 'Unemployed: ' + data[0].unemployed + '</p>';
    	content1 += '<p style="font-size:13px;">' + 'Underemployed: ' + data[0].underemployed + '</p>';
    	content1 += '</div>';
    	
    	console.log(data);
    	console.log("Population: " + data[0].population);
    	console.log("Population: " + data['population']);
    	content.innerHTML = content1;
    	overlay.setPosition(coordinate);
    	featureOverlay.getSource().addFeature(feature);
    });
  }



}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}