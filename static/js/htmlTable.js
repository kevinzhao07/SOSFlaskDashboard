// creates the HTML table
function makeHtmlTable() {
    // selects table to add
    table = d3.select("#sosTable")
    thead = table.append('thead').append('tr')
      .selectAll('th')
      .data(d => DATA.columns.slice(0, -2))
      .join('th')
        .text((d,i) => i = 1 ? formatHTMLthings(d): d)
    tbody = table.append('tbody');

    updateAll(date.top(10));

    var clicks = {"date": 0, "county": 0, "age": 0, "gender": 0, "race": 0};
    thead
        .on("click", function(d) {
          // if (d == "county") {
          //   clicks.county++;
          //     var countyNames = CF.dimension(function(d){return d.county;});
          //   if (clicks.county % 2 == 0) {
          //     sortTable(countyNames.top(Infinity))
          //
          //   } else {
          //     sortTable(countyNames.bottom(Infinity))
          //
          //   } //close else
          // } //close if d is county

          if (d == "Age") {
            clicks.age++;
            var agesToSort = CF.dimension(function(d){return d.Age;});
            if (clicks.age % 2 == 0) {
              sortTable(agesToSort.top(Infinity));

            } else {
              sortTable(agesToSort.bottom(Infinity));

            } //close else
          } //close if d is age

          if (d == "Gender") {
            clicks.gender++;
            var gendersToSort = CF.dimension(function(d){return d.Gender;});
            if (clicks.gender % 2 == 0) {
              sortTable(gendersToSort.top(Infinity))

            } else {
              sortTable(gendersToSort.bottom(Infinity))

            } //close else
          } //close if d is gender

          if (d == "Race") {
            clicks.race++;
            var racesToSort = CF.dimension(function(d){return d.Race;});
            if (clicks.race % 2 == 0) {
              sortTable(racesToSort.top(Infinity))

            } else {
              sortTable(racesToSort.bottom(Infinity))

            } //close else
          } //close if d is race
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
