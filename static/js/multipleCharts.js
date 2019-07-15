// creates all charts
async function makeDashboard(fileName) {
    // parse the date / time
    parseDate = d3.timeParse("%Y-%m-%d");
    formatDate = d3.timeFormat("%b %d, %Y");

    DATA = await d3.csv(fileName, type);
    CF = crossfilter(DATA);
    date = CF.dimension(d => d.date);

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


function reduceData(data) {
    if (data.length > 10) {
        var middle = new Array({"date": "...", "county": "...", "Age": "...", "Gender": "...", "Race": "...", "lng": "...", "lat": "..."});
        var wholeData = data;
        var topData0 = wholeData[0];
        var topData1 = wholeData[1];
        var topData2 = wholeData[2];
        var topData3 = wholeData[3];
        var topData4 = wholeData[4];

        var topData = [topData0, topData1, topData2, topData3, topData4];

        var bottomData4 = wholeData[wholeData.length - 5];
        var bottomData3 = wholeData[wholeData.length - 4];
        var bottomData2 = wholeData[wholeData.length - 3];
        var bottomData1 = wholeData[wholeData.length - 2];
        var bottomData0 = wholeData[wholeData.length - 1];

        var bottomData = [bottomData4, bottomData3, bottomData2, bottomData1, bottomData0];

        data = topData.concat(middle);
        data = data.concat(bottomData);
    }
    return data;
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
  // remove selected filters
    resetGender();
    resetAge();
    resetRace();

    // update bars to reflect unfiltering
    updateAll(date.top(Infinity));
}

function resetGender() {
    genderArray = [];
    gender.filterAll();
    slices.attr("fill", (d,i) => color[i]);
    updateAll(gender.bottom(Infinity));
}

function resetAge() {
    ageArray = [];
    age.filterAll();
    barsAge.style("fill", "lightblue");
    updateAll(age.bottom(Infinity));
}

function resetRace() {
    raceArray = [];
    race.filterAll();
    barsRace.style("fill", "pink");
    updateAll(race.bottom(Infinity));
}
