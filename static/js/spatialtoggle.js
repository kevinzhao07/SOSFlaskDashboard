function toggleSpatialFilter(){
    var toggleBtn = document.getElementById('toggle-button');
    if (toggleBtn.checked){
        bool = true
        updateAll(bool);
    } else {
        bool = false
        updateAll(bool);
    };
};
