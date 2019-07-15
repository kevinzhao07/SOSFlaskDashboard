// creates the HTML table
function makeHtmlTable() {
    // selects table to add
    table = d3.select("#sosTable")
    thead = table.append('thead').append('tr')
      .selectAll('th')
      .data(d => DATA.columns.slice(0, -2))
      .join('th')
        .text((d,i) => i = 1 ? formatHTMLthings(d): d);
    tbody = table.append('tbody');
    console.log(DATA.columns);
    updateAll(date.top(10));
  }

// updates HTML table
function updateHtmlTable(data = date.top(Infinity)) {
    rows = tbody.selectAll('tr')
        .data(data)
        .join('tr')
    rows.selectAll('td')
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
