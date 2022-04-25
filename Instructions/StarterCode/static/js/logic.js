var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

getEarthquakes = d3.json(queryUrl).then((data) => {


    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5
      });
      
      
      // Add a tile layer.
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(myMap);
      
    L.geoJSON(data.features, {
        pointToLayer: function (feature, latlng) {
            function getColor(d) {
                return d > 90 ? '#FC4E2A' :
                d > 69 ? '#FD8D3C' :
                d > 49 ? '#FEB24C' :
                d > 29 ? '#FED976' :
                d > 9 ? '#FFEADA0' :
                '#BD0026' ;
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
          magnitudeMarker.bindPopup(JSON.stringify(feature.properties))
          return magnitudeMarker
        }
    }).addTo(myMap);
})

//sets up proomise for longitude 





// create a map using leaf let using lat and longitiude, marker should reflect 
// magnitude
