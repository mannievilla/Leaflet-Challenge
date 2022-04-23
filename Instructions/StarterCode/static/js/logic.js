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
            return L.circleMarker(latlng, {
                // make dynamic make a functio that return object
              radius: feature.properties.mag * 5,
              fillColor: "#ff7800",
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
          });
        }
    }).addTo(myMap);
})

//sets up proomise for longitude 





// create a map using leaf let using lat and longitiude, marker should reflect 
// magnitude
