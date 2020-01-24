// creates all charts
async function makeDashboard(fileName, placename, placetype) {
    previous = "";
    neutral = "fa-sort";
    ascending = "fa-sort-asc";
    descending = "fa-sort-desc";
    // parse the date / time
    parseDate = d3.timeParse("%Y-%m-%d");
    formatDate = d3.timeFormat("%b %d, %Y");
    DATA = await d3.csv(fileName, type);
    CF = crossfilter(DATA);
    srcDim = CF.dimension(d => d.src)
    changeSrc()
    if (placetype == 'county') {
        countyDim = CF.dimension(d => d.county);
        countyDim.filter(d => d === placename)
    } else  {
        cityDim = CF.dimension(d => d.city);
        cityDim.filter(d => d.includes(placename))
    }
    rows = 10;
    sortColumn = "date";
    makeTimeSeries();
    createMap();
    makeAgeChart();
    makeGenderChart();
    makeRaceChart();
    makeHtmlTable();
};

// read in data
function type(d) {
  d.date = parseDate(d.date);
  d.lat = +d.lat;
  d.lng = +d.lng;
  return d;
};

// updates all
function updateAll(updateCharts = true) {
    if (updateCharts) {
        updateMap(map.getBounds());
        updateTimeSeries();
        summaryStats();
        updateAge();
        updateGender();
        updateRace();
    }
    let tableData = getSortedData(sortColumn);
    tableData = reduceData(tableData);
    updateHtmlTable(tableData);
};

// Calculate descriptive statistics
function summaryStats(dayRange=x.domain()) {
    const days = numDays()
    const prevDayRange = [d3.timeDay.offset(dayRange[0],-days), dayRange[0]];
    dateDim.filter(prevDayRange)
    const N0 = CF.groupAll().value()
    dateDim.filter(dayRange)
    const N1 = CF.groupAll().value()
    const delta = N1-N0
    const formatPct = d3.format('+,.0%')
    const pctChange = N0 > 0 ? formatPct(delta/N0) : "N/A"
    dayRange[1] = d3.timeSecond.offset(dayRange[1],-1);
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
    return data.includes("+") ? 'color:red'
        : data.includes("-") ? 'color:green'
        : 'color:black' ;
};

function colorCode(data){
    return data > 0 ? 'color:red'
        : data < 0 ? 'color:green'
        : 'color:black' ;
};

function arrowUpDown(data){
    return data > 0 ? `<i class= "fa fa-arrow-up"></i> ${data}`
        : data < 0 ? `<i class ="fa fa-arrow-down"></i> ${Math.abs(data)}`
        : `${data}` ;
};

function resetAll() {
    resetGender();
    resetAge();
    resetRace();
    updateAll();
};

function changeSrc() {
    d3.select('#datasource').text( () => src === 'EMS' ? `EMS Naloxone Administrations - SIMULATED` : 'Suspected Drug Related Deaths - SIMULATED')
    srcDim.filter(d => d === src)  
}

function updateSrc(source) {
    src = source
    changeSrc()
    updateAll()
}