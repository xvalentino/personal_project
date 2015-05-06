$(document).ready(function() { 
  var sortedDensities = null;

  function sortNumber(a,b) {
    return a - b;
  }

  densities = []

  var getDensity = function(population, area) {
    var density = population/area;
    densities.push(density);
  }

  var correctColor = function(population, area) {
    var density = population/area;
    var max = sortedDensities[sortedDensities.length-100];
    var color = density/max;
    return Math.floor(color)
  };

  var updateCounties = function(counties, populations) {
    if(!sortedDensities) {
      sortedDensities = densities.sort(sortNumber);
    }
    return L.geoJson(counties, {
      style: function(feature) {
        getDensity(populations[feature.properties.COUNTY], feature.properties.CENSUSAREA);
        var offset = correctColor(populations[feature.properties.COUNTY], feature.properties.CENSUSAREA);
        var color = 255 - offset;
        feature.properties.fill = 'rgb(' + color + ', 255,' + color + ' )';
      }
    }).toGeoJSON();
  }

  $.getJSON('/county_polygons_500k.json').then(function(counties) {
    $.getJSON('/counties').then(function(population) {
      modifiedCounties = updateCounties(counties, population);
      L.mapbox.accessToken = 'pk.eyJ1IjoieHZhbGVudGlubyIsImEiOiJ5dG43MDFjIn0.tEQIYibYnwUQNhCg1v0jtw';
      var map = L.mapbox.map('map', 'xvalentino.m2ama5kc').setView([39, -98], 4);
      var featureLayer = L.mapbox.featureLayer(modifiedCounties).addTo(map);
    })
  })
});

