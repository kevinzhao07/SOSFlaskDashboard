function toggleMapFilter(){
    var toggleBtn = document.getElementById('toggle-button');
    if (toggleBtn.checked){
        bool = true
        updateAll();
        d3.select('.disclaim').html("total*");
    } else {
        bool = false
        updateAll();
        d3.select('.numberExcl').html("");
        d3.select('.disclaim').html("total");
    };
};
