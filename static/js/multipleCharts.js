// creates all charts
async function makeDashboard(fileName) {
    // parse the date / time
    parseDate = d3.timeParse("%Y-%m-%d");
    formatDate = d3.timeFormat("%b %d %Y");

    DATA = await d3.csv(fileName, type);
    CF = crossfilter(DATA);
    date = CF.dimension(d => d.date)

    createMap();
    makeTimeSeries();
    makeAgeChart();
    makeGenderChart();
    makeRaceChart();
    makeHtmlTable();
}

// updates all maps
function updateAll(data = date.top(10)) {
    updateHtmlTable(data);
    updateMap(map.getBounds());
    updateTimeSeries();
    summaryStats(x.domain());
    updateAge();
    updateGender();
    updateRace();
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
    date.filter(prevDayRange)
    const N0 = CF.groupAll().value()
    date.filter(dayRange)
    const N1 = CF.groupAll().value()
    const delta = N1-N0
    const pctChange = N0 > 0 ? delta/N0: ""
    const formatPct = d3.format('+,.0%')(pctChange)
    const fDate = dayRange.map(formatDate)
    d3.selectAll('.summary')
    .data([fDate[0],fDate[1],N1,delta,formatPct])
    .html(d => d)
    d3.select('#Pct')
    .datum(pctChange)
    .attr('style', d => d > 0 ? 'color:red' : 'color:green')
    d3.select('#Np')
    .datum(delta)
    .attr('style', d => d > 0 ? 'color:red' : 'color:green')
    .html(d => d > 0 ? `<i class= "fa fa-arrow-up"></i> ${d}` : d < 0 ? `<i class ="fa fa-arrow-down"></i> ${Math.abs(d)}` : d)
    }

function resetAll() {

}
