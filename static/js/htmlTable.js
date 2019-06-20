// creates the HTML table
function makeHtmlTable() {
    // selects table to add
    table = d3.select("#sosTable")
    thead = table.append('thead').append('tr')
      .selectAll('th')
      .data(DATA.columns)
      .join('th')
        .text(d => d);
    tbody = table.append('tbody');
  
    updateAll(date.top(10));
  }
  
// updates HTML table
function updateHtmlTable(data = date.top(10)) {
    rows = tbody.selectAll('tr')
        .data(data)
        .join('tr')
    rows.selectAll('td')
        .data((d) => d3.values(d))
        .join('td')
        .text((d,i) => i > 0 ? d : d)
}