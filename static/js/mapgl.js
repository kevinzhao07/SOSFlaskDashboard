// create svg of map
function createMap() {// Mapbox section
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3RjaG9pIiwiYSI6ImNqd2pkNWN0NzAyNnE0YW8xeTl5a3VqMXQifQ.Rq3qT82-ysDHcMsHGTBiQg';
    layers = {
        'Light':'mapbox://styles/mapbox/light-v10',
        'Dark': 'mapbox://styles/mapbox/dark-v10',
        'Main': 'mapbox://styles/stchoi/cjwky60dk0toy1cm8fnhngzrv'
    };

    latDim = CF.dimension(d => d.lat)
    lngDim = CF.dimension(d => d.lng)

    map = new mapboxgl.Map({
        container:'mapObj',
        style: 'mapbox://styles/stchoi/cjwky60dk0toy1cm8fnhngzrv',
        center: [centerMapbox.lng, centerMapbox.lat],
        zoom: zoomMapbox-1,
        maxBounds: [[-92,36],[-80,52]]
    })
        // .setView(centerMapbox, zoomMapbox)
        // .addLayer(layers.Main) // default layer
        // .addControl(L.mapbox.geocoderControl('mapbox.places', {autocomplete: true}))
        // .setMaxBounds([[36,-92],[52,-80]])
        // .setMinZoom(5)

        map.dragRotate.disable();
        map.touchZoomRotate.disableRotation();

    //add source
    map.on('load', function(){
        map.addSource('citycounty',{
          type : 'geojson',
          data: county_geojson
        });

        //add layer
        map.addLayer({
          id: 'citycountyLayer',
          type: 'fill',
          source: 'citycounty',
          paint:{
            'fill-color' : '#adcfe6',
            'fill-opacity' : 0.40
          }
        });
    });

    drawMarkers();


    // map.scrollWheelZoom.disable();

  //   function style(feature) {
  //       return {
  //           fillColor: '#adcfe6',
  //           weight: 2,
  //           opacity: 1,
  //           color: '#72add4',
  //           fillOpacity: 0.30
  //       };
  // }
    //
    // L.control.layers(layers).addTo(map); // add basemap control
    // featureLayer = L.mapbox.featureLayer().addTo(map);
    // const citycountyLayer = L.mapbox.featureLayer(county_geojson, {style : style}).addTo(map);

    // drawMarkers();
    //
    // // spatial filtering on map event
    // map.on('moveend zoomend', function() {
    //     lastFilter = "date";
    //     // updateAll();
    // });
};

// draw map markers
function drawMarkers() {
    const days = (dayRange[1] - dayRange[0]) / 86400000;
    for (let pt of latDim.top(Infinity)) {
        const offset = (dayRange[1] - pt.date) / 86400000;
        var thing = document.createElement('div');
        thing.className = 'marker';
        new mapboxgl.Marker(thing)
            .setLngLat([pt.lng, pt.lat])
            .addto(map)
        // {
        //     icon: tableIcon,
        //     opacity: d3.max([1 - (offset-1)/days, 0]),
        //   })
            .setPopup(new mapboxgl.Popup({ offset : 25 })
              .setHTML(`<p>${formatDate(pt.date)}<br>${pt.county}<br>${pt.Age} ${pt.Race} ${pt.Gender}</p>`)
              .addto(map)
            )
      };
};
// function updateMap(bounds) {
//     latDim.filter([bounds.getSouth(), bounds.getNorth()])
//     lngDim.filter([bounds.getWest(), bounds.getEast()])
//     featureLayer.clearLayers()
//     drawMarkers()
// };
