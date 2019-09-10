let width = 550;
let height = width;

//Create SVG element and append map to the SVG

let mich = d3.select(".mich")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Load topojson data
async function makeMichMap(svgname) {
  // Append Div for tooltip to SVG
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
      .attr("title", d => d.properties.name)
      $(function() {
        $('[data-toggle="tooltip"]').tooltip()
      })
  };

function type(d) {
    d.lat = +d.lat;
    d.lng = +d.lng;
    return d
};
