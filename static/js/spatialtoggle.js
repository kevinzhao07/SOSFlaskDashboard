function checkYes(){
    var toggleBtn = document.getElementById('toggle-button');
  // https://stackoverflow.com/questions/8723152/javascript-toggle-state-function
    if (toggleBtn.checked){
        //do this toggle function with false passed in;
        bool = true
        updateAll(bool);
        console.log('toggle on state')
    } else {
        //do this toggle function wih true passed in;
        bool = false
        updateAll(bool);
        console.log('toggle off state')
    };
};

function toggMap(boole){
    if (boole === true){
        console.log('bool is true');
        let bounds = map.getBounds();
        latDim.filter([bounds.getSouth(), bounds.getNorth()])
        lngDim.filter([bounds.getWest(), bounds.getEast()])
    } else {
        console.log('bool is false');
        latDim.filterAll();
        lngDim.filterAll();
    }
    featureLayer.clearLayers();
    drawMarkers();
};
