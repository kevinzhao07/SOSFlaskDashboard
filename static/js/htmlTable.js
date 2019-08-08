// creates the HTML table
var previous = "";
var sortColumn = "date"
var neutral = "fa-sort";
var ascending = "fa-sort-asc";
var descending = "fa-sort-desc";

function makeHtmlTable() {
    // selects table to add
    table = d3.select("#sosTable")
    thead = table.append('thead').append('tr')
      .selectAll('th')
      .data(d => DATA.columns.slice(0, -2))
      .join('th')
        .text((d,i) => i = 1 ? formatHTMLthings(d): d)
        .attr('class', (d,i) => DATA.columns.slice(0,-2)[i] + " sortable")
    tbody = table.append('tbody');

    updateAll(date.top(10));

    var clicks = {"date": 0, "county": 0, "age": 0, "gender": 0, "race": 0};
    thead
        .html(function(d){  //this function adds neutral sort-state arrows
          const theseNames = ['Age', 'Gender', 'Race', 'date']
          if (theseNames.includes(d)){
            return d + ' <i class="fa fa-sort"></i>'
          } else {
            return d
          }
        })
        .on("click", function(d) {
          toggleToAsc(this); //take the clicked thing and run toggleToAsc on it
          sortColumn = d; //replace initial value in sortColumn with the val in "d"
          resortedData = getSortedData(sortColumn); //take the val in "d" and run getSortedData on it, return a sorted data set
          sortTable(resortedData) // update table with the resorted data

          function toggleToAsc(element){
            current = element;

            if (previous === current){
              // console.log("current is previous");
              toggleAscDesc();

            } else if (previous != ""){
              // console.log("current is not previous and previous is not empty");
              d3.select(previous).select('i').classed(neutral, true).classed(ascending, false).classed(descending, false);
              d3.select(current).select('i').classed(ascending, true).classed(neutral, false);
              previous = current;
            } else {
              // console.log("current is not previous and previous is empty");
              d3.select(current).select('i').classed(ascending, true).classed(neutral, false);
              previous = current;
            }
          }

          function toggleAscDesc(){
            if(d3.select(current).select('i').classed(ascending)){
              d3.select(current).select('i').classed(descending, true).classed(ascending, false);
            } else{
              d3.select(current).select('i').classed(descending, false).classed(ascending, true);
            }
          }

        } //close function
      ); //close on click
}

// updates HTML table
function updateHtmlTable(data = date.top(Infinity)) {
    row = tbody.selectAll('tr')
        .data(data)
        .join('tr')
    row.selectAll('td')
        .data((d) => d3.values(d).slice(0,-2))
        .join('td')
        .text((d,i) => i = 1 ? formatHTMLthings(d) : d)
}

function formatHTMLthings(d){
  if (d instanceof Date){
    var formatted = d3.timeFormat("%b %d, %Y")(d)
    return formatted;
  }
  else{
    return d;
  }
}

function sortTable(data){
  data = reduceData(data)
  updateHtmlTable(data)
}
function getSortedData(sortColumn){

  if (sortColumn == "date") {
    if (d3.select('.date').select('i').classed(descending)) {
      return date.top(Infinity);
    } else {
      return date.bottom(Infinity);
    } //close else
  } //close if date

  if (sortColumn == "Age") {
    if ((d3.select('.Age').select('i').classed(descending))) {
    return age.top(Infinity);
    } else {
    return age.bottom(Infinity);
    } //close else
  } //close if age

  if (sortColumn == "Gender") {
    if ((d3.select('.Gender').select('i').classed(descending))) {
      return gender.top(Infinity);
    } else {
      return gender.bottom(Infinity);
    } //close else
  } //close if gender

  if (sortColumn == "Race") {
    if ((d3.select('.Race').select('i').classed(descending))) {
      return race.top(Infinity);
    } else {
      return race.bottom(Infinity);
    } //close else
  } //close if race
}
