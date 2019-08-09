// creates all charts
async function makeDashboard(fileName) {
    // parse the date / time
    parseDate = d3.timeParse("%Y-%m-%d");
    formatDate = d3.timeFormat("%b %d, %Y");

    DATA = await d3.csv(fileName, type);
    CF = crossfilter(DATA);

    rows = 10;
    lastFilter = "date";
    sortColumn = "date";
    selected10 = true;
    selected20 = false;
    selected50 = false;

    makeTimeSeries();
    createMap();
    makeAgeChart();
    makeGenderChart();
    makeRaceChart();
    makeHtmlTable();

}

// updates all maps
function updateAll(updateCharts = true) {
    if (updateCharts) {
      updateMap(map.getBounds());
      updateTimeSeries();
      summaryStats(x.domain());
      updateAge();
      updateGender();
      updateRace();
    }
    let tableData = getSortedData(sortColumn);
    tableData = reduceData(tableData);
    updateHtmlTable(tableData);
}

function reduceData(data) {
    if (data.length > rows) {
        const middle = new Array({"date": "...", "county": "...", "Age": "...", "Gender": "...", "Race": "...", "lng": "...", "lat": "..."});
        const topData = data.slice(0,rows/2);
        const bottomData = data.slice(-rows/2);
        var data = [...topData, ...middle, ...bottomData];
    }
    return data;
}


function changeRows(N) {
  rows = N;
  updateAll(updateCharts=false)
  d3.selectAll(".change").classed("selected", false);
  if (N == 10) {
      d3.selectAll(".ten").classed("selected", true);
  } else if (N == 20) {
      d3.selectAll(".twenty").classed("selected", true);
  } else if (N == 50) {
      d3.selectAll(".fifty").classed("selected", true);
  }
}

// read in data
function type(d) {
    d.date = parseDate(d.date);
    d.lat = +d.lat;
    d.lng = +d.lng;
    return d;
}

// Calculate descriptive statistics
function summaryStats(dayRange) {
    const days = (dayRange[1] - dayRange[0]) / 86400000
    const prevDayRange = [d3.timeDay.offset(dayRange[0],-days), dayRange[0]];
    dayRange[1] = d3.timeSecond.offset(dayRange[1],-1);
    date.filter(prevDayRange)
    const N0 = CF.groupAll().value()
    date.filter(dayRange)
    const N1 = CF.groupAll().value()
    const delta = N1-N0
    const formatPct = d3.format('+,.0%')
    const pctChange = N0 > 0 ? formatPct(delta/N0) : "N/A"
    const fDate = dayRange.map(formatDate)
    d3.selectAll('.summary')
        .data([fDate[0],fDate[1],N1,delta,pctChange])
        .html(d => d)
    d3.select('#Pct')
        .datum(pctChange)
        .attr('style', d => colorCodePct(d))
    d3.select('#Np')
        .datum(delta)
        .attr('style', d => colorCode(d))
        .html(d => arrowUpDown(d))

    // console.log(dayRange[1])
    }

function colorCodePct(data){
  if (data.includes("+")){
    return 'color:red';

  }
  else if (data.includes("-")){
    return 'color:green';
  }
  else{
    return 'color:black';
  }
}

function colorCode(data){
  if (data > 0){
    return 'color:red';

  }
  else if (data < 0){
    return 'color:green';
  }
  else{
    return 'color:black';
  }
}

function arrowUpDown(data){
  if (data > 0){
    return `<i class= "fa fa-arrow-up"></i> ${data}`;
  }
  else if (data < 0){
    return `<i class ="fa fa-arrow-down"></i> ${Math.abs(data)}`;
  }
  else{
    return `${data}`;
  }
}


function resetAll() {
  // remove selected filters
    resetGender();
    resetAge();
    resetRace();

    // update bars to reflect unfiltering
    usedData = getSortedData(sortColumn);
    updateAll(usedData);
}

function resetGender() {
    genderArray = [];
    gender.filterAll();
    slices.attr("fill", (d,i) => color[i])
        .attr('stroke', '')
        .attr('stroke-width', 0);
    usedData = getSortedData(sortColumn);
    updateAll(usedData);
}

function resetAge() {
    ageArray = [];
    age.filterAll();
    barsAge.style("fill", "#FB9A99")
        .attr('stroke', '')
        .attr('stroke-width', 0);
    usedData = getSortedData(sortColumn);
    updateAll(usedData);
}

function resetRace() {
    raceArray = [];
    race.filterAll();
    barsRace.style("fill", "#CAB2D6")
        .attr('stroke', '')
        .attr('stroke-width', 0);
    usedData = getSortedData(sortColumn);
    updateAll(usedData);
}
