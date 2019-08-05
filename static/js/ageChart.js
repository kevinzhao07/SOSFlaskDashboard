function makeAgeChart() {// set up dimensions of age horizontal bar graph

    age = CF.dimension(d => d.Age);
    agegrp = age.group();
    dataAge = agegrp.all();
    ageArray = [];

    var first = dataAge[0];
    var second = dataAge[1];
    var third = dataAge[2];
    var fourth = dataAge[3];
    var fifth = dataAge[4];

    dataAge = [fifth, fourth, third, second, first];

    marginAge = {top: 30, right: 75, bottom: 40, left: 45},
        widthAge = 450 - marginAge.left - marginAge.right,
        heightAge = 400 - marginAge.top - marginAge.bottom;


    // append age graph 'svg'
    svgAge = d3.select("#age")
        .attr("width", widthAge + marginAge.left + marginAge.right)
        .attr("height", heightAge + marginAge.top + marginAge.bottom)
        .append("g")
        .attr("transform", "translate(" + marginAge.left + "," + marginAge.top + ")");


    // set the x and y axis of the age graph
    xAge = d3.scaleLinear()
        .range([widthAge, 0])
    yAge = d3.scaleBand()
        .padding(0.2)
        .range([heightAge, 0]);

    xAge.domain([0, d3.max(dataAge, d=>d.value)]);

    yAge.domain(dataAge.map(function(d) { return d.key;}));

    yAxis1 = d3.axisRight()
        .scale(yAge);

    // append bars to age graph
    barsAge = svgAge.selectAll(".graph")
        .data(dataAge)
        .enter().append("rect")
        .attr("class", "barAge")
        .attr("y", d=>yAge(d.key))
        .attr("height", yAge.bandwidth())
        .attr("x", d=>xAge(d.value))
        .attr("width", function(d) {return widthAge - xAge(d.value)})
        .style("fill", '#FB9A99')

        // onclick
        .on('click', function(d) {

            lastFilter = "age";

            // if clicked, filter table
            if (ageArray.includes(d.key)) {
                d3.select(this)
                .style("fill", '#FB9A99')
                .attr('stroke-width', 0)
                .attr('stroke', '')
                ageArray.splice(ageArray.indexOf(d.key),1)
            }
            else {
                d3.select(this)
                    // .style("fill", "#117190");
                    .style('fill', '#d4f2e0')
                    .attr('stroke-width', 4)
                    .attr('stroke', '#95dfb3');
                ageArray.push(d.key);
            }

            // if unclicked
            if (ageArray.length == 0) {
                age.filterAll();
            }
            else {
                age.filter(d => ageArray.includes(d));
            }

            // updates graphs
            updateAll(age.bottom(Infinity));
        });


    // adds text for bars on age
    barsAgeLabel = svgAge.selectAll("text")
        .data(dataAge)
        .enter().append("text")
        .attr("class", "chart")
        .style("font-size","16px")
        .attr("x", d=>xAge(d.value) - 32)
        .attr("y", d=>yAge(d.key) + yAge.bandwidth() - 18)
        .text(d=>d.value);

    // adds text on y axis for age graph
    svgAge.append("g")
        .attr("class", "y")
        .call(yAxis1)
        .attr("transform", `translate(${widthAge},0)`)
        .selectAll(".tick text")
        .attr("x", 10)

    // specifies size for y axis age graph
    svgAge.select(".y")
        .selectAll("text")
        .style("font-size","16px");

    // adds text for x axis age graph
    svgAge.append("g")
        .attr("class","x")
        .attr("transform", `translate(0,${heightAge})`)
        .call(d3.axisBottom(xAge) .ticks(5))
        .selectAll(".tick text")
        .style("font-size","16px")
        .attr("y", 10);

}

function updateAge() {
    max = d3.max(dataAge, d=>d.value);
    newMax = Math.max(max, 5);

    xAge.domain([0,newMax]);
    svgAge.select(".x")
        .transition().duration(200)
        .call(d3.axisBottom(xAge) .ticks(6))
    .selectAll(".tick text")
        .style("font-size","16px")

    barsAge.data(dataAge)
        .transition().duration(200)
        .attr("x", d=>xAge(d.value))
        .attr("width", d => (widthAge - xAge(d.value)));

    barsAgeLabel.data(dataAge)
        .transition().duration(200)
        .attr("x", d=>xAge(d.value) - 18)
        .text(d => d.value);
  }
