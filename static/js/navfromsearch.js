function navPlace(){
event.preventDefault();

var placeName = document.querySelector("#searchbar").value;
var form = document.querySelector(".formthing");

if(cities.includes(placeName)){
  console.log("True");

  location.href = "/dashboard" + "?src=EMS&" + "city="+placeName;

}
else{
  console.log("False");
  location.href  = "/dashboard" + "?src=EMS&" + "county="+placeName;
};

console.log(location.href );
};
