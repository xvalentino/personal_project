$(function() {
  var updateStates = function(states) {
    var colors = ['green', 'white', 'red', 'purple', 'cyan']
    return L.geoJson(states, {
      style: function(feature) {
        //update the style however you want
        feature.properties.fill = colors[Math.floor(Math.random() * colors.length - 1)];
      }
    }).toGeoJSON();
  }

  $.getJSON('/state_polygons.json').then(function(states) {
    states = updateStates(states);
    L.mapbox.accessToken = 'pk.eyJ1IjoieHZhbGVudGlubyIsImEiOiJ5dG43MDFjIn0.tEQIYibYnwUQNhCg1v0jtw';
    var map = L.mapbox.map('map', 'examples.map-i86nkdio').setView([39, -98], 4);
    var featureLayer = L.mapbox.featureLayer(states).addTo(map);
  })
});

