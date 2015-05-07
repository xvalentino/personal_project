$(document).ready(function() { 
  function sortNumber(a,b) {
    return a - b;
  }

  densities = [];

  var getDensity = function(population, area) {
    var density = population/area;
    densities.push(density);
  }

  var correctColor = function(population, area) {
    var density = population/area;
    var max = sortedDensities[sortedDensities.length-500];
    var color = ((density/max)*255)+50;
    return Math.floor(color)
  };

  var updateCounties = function(counties, populations) {
    for(var i = 0; i < counties.features.length; i++) {
      var feature = counties.features[i];
      getDensity(populations[feature.properties.STATE + feature.properties.COUNTY], turf.area(feature));
    }
    sortedDensities = densities.sort(sortNumber);
    return L.geoJson(counties, {
      style: function(feature) {
        var offset = correctColor(populations[feature.properties.STATE + feature.properties.COUNTY], turf.area(feature));
        var color = 255 - offset;
        feature.properties.fill = 'rgb(' + color + ', 255,' + color + ' )';
      }
    }).toGeoJSON();
  }

  $.getJSON('/shapes').then(function(counties) {
    $.getJSON('/counties').then(function(population) {
      modifiedCounties = updateCounties(counties, population);
      L.mapbox.accessToken = 'pk.eyJ1IjoieHZhbGVudGlubyIsImEiOiJ5dG43MDFjIn0.tEQIYibYnwUQNhCg1v0jtw';
      var map = L.mapbox.map('map', 'xvalentino.m2ama5kc').setView([39, -98], 4);
      featureLayer = L.mapbox.featureLayer(modifiedCounties).addTo(map);

      featureLayer.on('click', function(e) {
        genetic_algorithm(e.layer.feature, 0);
      });

      function genetic_algorithm(selectedCounty, count) {
        if (count > 10) return featureLayer.setGeoJSON(featureLayer.toGeoJSON());

        var parent = getParents(selectedCounty);
        featureLayer._geojson.features = featureLayer._geojson.features.map(function (feature) {
          if (feature.properties.GEO_ID === selectedCounty.properties.GEO_ID) {
            feature.properties.fill = 'red';
          }
          return feature;
        })
        selectedCounty.properties.fill = "red";
        genetic_algorithm(parent, ++count);
      }

      function getParents(selectedCounty) {
        var against = {
          "type": "FeatureCollection",
          "features": featureLayer._geojson.features.map(function(feature) {
            return {
              "type": "Feature",
              "properties": feature.properties,
              "geometry": {
                "type": "Point",
                "coordinates": turf.center(feature)
              }}
          }).filter(function (feature) {
            return feature.properties.GEO_ID === selectedCounty.properties.GEO_ID;
          })
        }
        var nearestPoint = turf.nearest(turf.center(selectedCounty), against);
        var coordinates = nearestPoint.geometry.coordinates.geometry.coordinates;
        return leafletPip.pointInLayer(coordinates, featureLayer, true)[0].feature;
      }

    })
  })

});
