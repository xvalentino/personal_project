$(document).ready(function() {

  var sortedPopulation = null;

  var correctColor = function(population) {

    var max = sortedPopulation[sortedPopulation.length-1];
    return Math.floor((population/max)*255)
  }

  var updateCounties = function(counties, populations) {
    if(!sortedPopulation) {
      sortedPopulation = Object.keys(populations).map(function(county){
        return populations[county]
      }).sort();
    }
    return L.geoJson(counties, {
      style: function(feature) {
        //update the style however you want
        var green = correctColor(populations[feature.properties.county]);
        var color = 255 - green;
        feature.properties.fill = 'rgb(' + color + ', 255,' + color + ' )';
      }
    }).toGeoJSON();
  }

  $.getJSON('/county_polygons_500k.json').then(function(counties) {
    $.getJSON('/counties').then(function(population) {
      counties = updateCounties(counties, population);
      L.mapbox.accessToken = 'pk.eyJ1IjoieHZhbGVudGlubyIsImEiOiJ5dG43MDFjIn0.tEQIYibYnwUQNhCg1v0jtw';
      var map = L.mapbox.map('map', 'xvalentino.m2ama5kc').setView([39, -98], 4);
      var featureLayer = L.mapbox.featureLayer(counties).addTo(map);
    })
  })
});

