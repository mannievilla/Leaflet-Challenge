console.log("logic.js")

var myMap = L.map("map", {
  center: [40.7, -94.5],
  zoom: 3
});

// Add a tile layer.
var USmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

USmap.addTo(myMap)

var baseMaps = {
  "US Map": USmap
};

var earthquakes = new L.LayerGroup();
var tectonicplates = new L.LayerGroup();

var overlays = {
  "Tectonic Plates": tectonicplates,
  "Earthquakes": earthquakes
};

L.control.layers(baseMaps, overlays).addTo(myMap);

var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

d3.json(queryUrl).then((data) => {

  L.geoJSON(data.features, {
    pointToLayer: function (feature, latlng) {
      function getColor(d) {
        return d > 90 ? '#FC4E2A' :
          d > 69 ? '#FD8D3C' :
            d > 49 ? '#FEB24C' :
              d > 29 ? '#FED976' :
                d > 9 ? '#FFEADA0' :
                  '#BD0026';
      }
      var magnitudeMarker = L.circleMarker(latlng, {

        // make dynamic make a functio that return object
        radius: feature.properties.mag * 5,
        fillColor: getColor(feature.geometry.coordinates[2]),
        //chloropeth mapping
        color: getColor(feature.geometry.coordinates[2]),
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      });
      //   magnitudeMarker.bindPopup(<h>`Magnitude: ${feature.properties.mag}`</h>) ;  
      //     return magnitudeMarker
      magnitudeMarker.bindPopup("Magnitude: " + JSON.stringify(feature.properties.mag) + "<br> Location: " + JSON.stringify(feature.properties.place))
      return magnitudeMarker
    }
  }).addTo(earthquakes);

  earthquakes.addTo(myMap)

  let legend = L.control({
    position: "bottomright"
  });

  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
      "#BD0026",
      "#FFEADA0",
      "#FED976",
      "#FEB24C",
      "#FD8D3C",
      "#FC4E2A"
    ];
    for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  };
  legend.addTo(myMap);

  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (platedata) {
    L.geoJson(platedata, {
      color: "orange",
      weight: 2
    })
      .addTo(tectonicplates);

    tectonicplates.addTo(myMap);
  });

})

//sets up proomise for longitude 





// create a map using leaf let using lat and longitiude, marker should reflect 
// magnitude
