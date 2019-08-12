function navPlace(){
    event.preventDefault();

    var placeName = document.querySelector("#searchthing").value;
    var form = document.querySelector(".formthing");

    if (cities.includes(placeName)) {
      location.href = "/dashboard" + "?src=EMS&" + "city=" + placeName;
    } else {
      location.href  = "/dashboard" + "?src=EMS&" + "county=" + placeName;
    };
};
