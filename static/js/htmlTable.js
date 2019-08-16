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

    thead
        .html(function(d){  //this function adds neutral sort-state arrows
          const theseNames = ['Age', 'Gender', 'Race', 'date']
          return theseNames.includes(d) ? d + ' <i class="fa fa-sort"></i>' : d
        })
        .on("click", function(d) {
          toggleToAsc(this); //take the clicked thing and run toggleToAsc on it
          sortColumn = d; //replace initial value in sortColumn with the val in "d"
          updateAll(updateCharts = false); // update table only

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
            d3.select(current).select('i').classed(ascending) ? d3.select(current).select('i').classed(descending, true).classed(ascending, false) :
              d3.select(current).select('i').classed(descending, false).classed(ascending, true);
          }
        } //close function
      ); //close on click
    updateAll();
};

// updates HTML table
function updateHtmlTable(data) {
    row = tbody.selectAll('tr')
        .data(data)
        .join('tr')
    row.selectAll('td')
        .data((d) => d3.values(d).slice(0,-2))
        .join('td')
        .text((d,i) => i = 1 ? formatHTMLthings(d) : d)
};

function formatHTMLthings(d){
  return d instanceof Date ?  d3.timeFormat("%b %d, %Y")(d) : d;
};

function getSortedData(sortColumn){
  if (sortColumn == "date") {
    return d3.select('.date').select('i').classed(descending) ? dateDim.top(Infinity) :
      dateDim.bottom(Infinity);
  } //close if date

  if (sortColumn == "Age") {
    return d3.select('.Age').select('i').classed(descending) ? ageDim.top(Infinity) :
      ageDim.bottom(Infinity);
  } //close if age

  if (sortColumn == "Gender") {
  return d3.select('.Gender').select('i').classed(descending) ? genderDim.top(Infinity) :
      genderDim.bottom(Infinity);
  } //close if gender

  if (sortColumn == "Race") {
    return d3.select('.Race').select('i').classed(descending) ? raceDim.top(Infinity) :
      raceDim.bottom(Infinity);
  } //close if race
};

function changeRows(N) {
    rows = N;
    updateAll(updateCharts=false)
    d3.selectAll(".change").classed("selected", false);
    const selection = N == 10 ? d3.select(".ten") :
                      N == 20 ? d3.selectAll(".twenty") :
                                d3.selectAll(".fifty")
    selection.classed("selected", true)
};

function reduceData(data) {
    if (data.length > rows) {
        const middle = new Array({"date": "...", "county": "...", "Age": "...", "Gender": "...", "Race": "...", "lng": "...", "lat": "..."});
        const topData = data.slice(0,rows/2);
        const bottomData = data.slice(-rows/2);
        var data = [...topData, ...middle, ...bottomData];
    }
    return data;
};
