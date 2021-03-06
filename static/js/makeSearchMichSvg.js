let width = 600;
let height = width;

//Create SVG element and append map to the SVG

let ONE = d3.select(".onemap")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Load topojson data
async function make_map(svgname) {
  // Append Div for tooltip to SVG
  let tooltipDiv = d3.select(".onemap")
      .append("div")
      .attr("class", "tooltips")
      .attr("data-toggle", "tooltip")
      .attr("data-placement", "top")

  const MItopo = await d3.json('static/geojson/counties_v17a.topojson')
  const cities = await d3.csv('static/data/cities.csv')
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
      .on("click", d => window.location.href = "/dashboard?county=" + d.properties.name)
      $(function() {
        $('[data-toggle="tooltip"]').tooltip()
      })

    svgname.selectAll('circle')
      .data(cities)
      .enter().append('circle')
        .attr('class', 'city')
        .attr('r', '4')
        .attr("data-toggle", "tooltip")
        .attr('cx', d => projection([d.lng,d.lat])[0])
        .attr('cy', d => projection([d.lng,d.lat])[1])
        .attr("title", d => d.name)
        .on("click", d => window.location.href = "/dashboard?city=" + d.name)
        $(function() {
          $('[data-toggle="tooltip"]').tooltip()
        })

  };

function type(d) {
    d.lat = +d.lat;
    d.lng = +d.lng;
    return d
};
