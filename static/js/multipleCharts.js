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

    previous = "";
    sortColumn = "date"
    neutral = "fa-sort";
    ascending = "fa-sort-asc";
    descending = "fa-sort-desc";


    makeTimeSeries();
    createMap();
    makeAgeChart();
    makeGenderChart();
    makeRaceChart();
    makeHtmlTable();
};
// updates all
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

function changeRows(N) {
    rows = N;
    updateAll(updateCharts=false)
    d3.selectAll(".change").classed("selected", false);
      N == 10 ? d3.selectAll(".ten").classed("selected", true) :
      N == 20 ? d3.selectAll(".twenty").classed("selected", true) :
      d3.selectAll(".fifty").classed("selected", true);
};

// read in data
function type(d) {
    d.date = parseDate(d.date);
    d.lat = +d.lat;
    d.lng = +d.lng;
    return d;
};

// Calculate descriptive statistics
function summaryStats(dayRange) {
    const days = (dayRange[1] - dayRange[0]) / 86400000
    const prevDayRange = [d3.timeDay.offset(dayRange[0],-days), dayRange[0]];
    dayRange[1] = d3.timeSecond.offset(dayRange[1],-1);
    dateDim.filter(prevDayRange)
    const N0 = CF.groupAll().value()
    dateDim.filter(dayRange)
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
    };

function colorCodePct(data){
    return data.includes("+") ? 'color:red' :
      data.includes("-") ? 'color:green' :
      'color:black';
};

function colorCode(data){
    return data > 0 ? 'color:red' :
      data < 0 ? 'color:green' :
      'color:black';
};

function arrowUpDown(data){
    return data > 0 ? `<i class= "fa fa-arrow-up"></i> ${data}` :
    data < 0 ? `<i class ="fa fa-arrow-down"></i> ${Math.abs(data)}` :
    `${data}`;
};

function resetAll() {
  // remove selected filters
    resetGender();
    resetAge();
    resetRace();

    // update bars to reflect unfiltering
    updateAll();
};

function resetGender() {
    genderArray = [];
    genderDim.filterAll();
    slices.attr("fill", (d,i) => color[i])
        .attr('stroke', '')
        .attr('stroke-width', 0);
    updateAll();
};

function resetAge() {
    ageArray = [];
    ageDim.filterAll();
    barsAge.style("fill", "#FB9A99")
        .attr('stroke', '')
        .attr('stroke-width', 0);
    updateAll();
};

function resetRace() {
    raceArray = [];
    raceDim.filterAll();
    barsRace.style("fill", "#CAB2D6")
        .attr('stroke', '')
        .attr('stroke-width', 0);
    updateAll();
};
