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
    });

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

    // spatial filtering on map event
    map.on('moveend zoomend', function() {
        updateAll();
    });
}

// draw map markers
function drawMarkers() {
    const days = (x.domain()[1] - x.domain()[0]) / 86400000;
    for (var i = 0; i < latDim.top(Infinity).length; i++ ) {
        const offset = (x.domain()[1] - latDim.top(Infinity)[i].date) / 86400000;
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = iconImg;
        el.style.width = '25px'
        el.style.height = '25px'

        popup = new mapboxgl.Popup()
                        .setHTML(`<p>${formatDate(latDim.top(Infinity)[i].date)}<br>${latDim.top(Infinity)[i].county}<br>${latDim.top(Infinity)[i].Age} ${latDim.top(Infinity)[i].Race} ${latDim.top(Infinity)[i].Gender}</p>`);

        marker =  new mapboxgl.Marker(el)
                          .setLngLat([latDim.top(Infinity)[i].lng,latDim.top(Infinity)[i].lat])
                          .setPopup(popup) // sets a popup on this marker
                          .addTo(map)
    }
};
function updateMap(bounds) {
    latDim.filter([bounds.getSouth(), bounds.getNorth()])
    lngDim.filter([bounds.getWest(), bounds.getEast()])
    d3.selectAll('.marker').remove();
    drawMarkers();
};
