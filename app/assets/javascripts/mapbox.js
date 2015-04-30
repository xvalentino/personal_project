$(document).ready(function() {

  var sortedPopulation = null;

  var correctColor = function(population) {

    var max = sortedPopulation[sortedPopulation.length-1];
    return Math.floor((population/max)*255)
  }

  var updateStates = function(states, populations) {
    if(!sortedPopulation) {
      sortedPopulation = Object.keys(populations).map(function(state){
        return populations[state]
      }).sort();
    }
    return L.geoJson(states, {
      style: function(feature) {
        //update the style however you want
        var green = correctColor(populations[feature.properties.NAME]);
        var color = 255 - green;
        feature.properties.fill = 'rgb(' + color + ', 255,' + color + ' )';
      }
    }).toGeoJSON();
  }

  $.getJSON('/state_polygons.json').then(function(states) {
    $.getJSON('/state_population.json').then(function(population) {
      states = updateStates(states, population);
      L.mapbox.accessToken = 'pk.eyJ1IjoieHZhbGVudGlubyIsImEiOiJ5dG43MDFjIn0.tEQIYibYnwUQNhCg1v0jtw';
      var map = L.mapbox.map('map', 'xvalentino.m2ama5kc').setView([39, -98], 4);
      var featureLayer = L.mapbox.featureLayer(states).addTo(map);
    })
  })
});

