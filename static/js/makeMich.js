let width = 550;
let height = width;

//Create SVG element and append map to the SVG

let mich = d3.select(".mich")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Load topojson data
async function makeMichMap(svgname, filename) {
  // Read in County Data
  const DATA = await d3.csv(filename, type);
  let counties = new Map();
  DATA.map(d => counties.set(d.county, d.value));
  const TOTAL = DATA.reduce((total,d) => total + d.value, 0)

  d3.select('.numberIncidents')
      .text(`Total Naxolone Incidents: ${TOTAL}`)

  let tooltipDiv = d3.select(".mich")
      .append("div")
      .attr("class", "tooltips")
      .attr("data-toggle", "tooltip")
      .attr("data-placement", "top")

  const MItopo = await d3.json('static/geojson/gz_2010_us_050_00_5m_MI_counties.topojson')
  // convert to geojson
  const MIgeo = topojson.feature(MItopo, MItopo.objects.collection)

  // D3 Projection
  let projection = d3.geoMercator()
      .fitSize([width, height], MIgeo)

  // Define path generator
  let path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
      .projection(projection);

  // Bind the data to the SVG and create one path per GeoJSON feature
  svgname.selectAll("path")
      .data(MIgeo.features)
    .enter().append("path")
      .attr('class','county')
      .attr("d", path)
      .attr("id", "tooltips")
      .attr("data-toggle", "tooltip")
      .attr("title", d => {
          const name = d.properties.name
          return name + ': ' + counties.get(name)
      })
      $(function() {
          $('[data-toggle="tooltip"]').tooltip()
      })
};

function type(d) {
  d.value = +d.value;
  return d
};
