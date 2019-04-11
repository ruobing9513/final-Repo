import * as d3 from 'd3';

	function audioFeature(data, rootDOM){

	    //data
	    //[{}, {}, {}...]x9
	    const margin = {top: 20, right: 20, bottom: 20, left: 20},
	        width = 900 - margin.left - margin.right,
	        height = 500 - margin.top - margin.bottom;

	    const xScale = d3.scaleLinear().range([40, width+50]).domain([0,105]);
	    const yScale = d3.scaleLinear().range([height, 20]).domain([2009,2018]);

	    //UPDATE SELECTION 
	    const plot3 = d3.select('.plot-3')
	        .append('svg')
	        .attr('width', width + 300)
	        .attr('height', height + 100)
	        .attr("transform","translate(" + margin.left + "," + margin.top + ")")

	    const xAxis = plot3.append("g")
	       .attr('transform', 'translate(0,' + height + ')') 
	       .attr("class", "xAxis")
	       .call(d3.axisBottom()
	        .ticks(10)
	        // .tickSize(-width)
	        .scale(xScale));

	    // Add the Y Axis
	    const yAxis = plot3.append("g")
	        .attr("class", "yAxis")
	        .attr('transform', 'translate(40,0)')
	        .call(d3.axisLeft().scale(yScale));

	    const tooltip  = d3.select('.plot-3').append("div")
	        .attr("class", "tooltip_feature")
	        .attr('width', 80)
	        .style("opacity", 0);

	    const colorScale = d3.scaleLinear()
	        .domain([0,1])
	        .range(['#FFFACD',"#DC143C"]);

	    //UPDATE SELECTION
	    const nodes = plot3.selectAll('.plot-3')
	        .data(data);

	    nodes.select('circle')
	        .style('fill','black')
	        .attr('r',5)

	    //ENTER SELECTION 
	    const nodesEnter = nodes.enter()
	        .append('g')
	        .attr('class', 'node')

	    nodesEnter.append('circle')
	        // .attr('transform', d => `translate(${xScale(d.ranking)} , ${yScale(d.popularity)})`)
	        .attr('r',1)
	        .attr('fill-opacity', 1)
	        .style('fill','black')
	        

	    //ENTER AND UPDATE SELECTION, MERGE 
	    nodes.merge(nodesEnter)
	        .transition()
	        .attr('transform', d => `translate(${xScale(d.ranking)} , ${yScale(d.year)})`);

	    nodes.merge(nodesEnter)
	        .select('circle')

	        .transition()
	        .duration(1500)
	        .attr('r',4)
	        .attr('fill-opacity',1)
	        .style('fill', d=>colorScale(d.acousticness));

	    nodes.merge(nodesEnter)
	        .on("click", function(d){
	            d3.select(this)
	            .style('fill','red')
	            .attr('r',10)
	            .attr('fill-opacity', 1)
	            // .style('stroke-width',2);
	            
	            tooltip.transition()
	                  .duration(200)
	                  .style('opacity',1)
	            tooltip
	                // TRACK IMAGE AND RANKING DOESNT MATCH WITH THE TRACK AND ARTIST 
	                  .html("<h2>" + d.artists_display + ' - ' + d.track_name + "</h2>" + "<br/>" + "<img src='"+d.artist_url+"'/>" 
	                    + "<br/>" + 'Danceability: ' + d.danceability 
	                    + "<br/>" + 'Energy: ' + d.energy 
	                    + "<br/>" + 'Speechiness: ' + d.speechiness
	                    + "<br/>" + 'Valence: ' + d.valence
	                    + "<br/>" + 'Acousticness: ' + d.acousticness
	                    + "<br/>" + 'Liveness: ' + d.liveness
	                    + "<br/>" + "<audio controls>" + "<source src=" + "'" +d.Preview+ "'" + " type=" + "'audio/mpeg'>");
	        })

	        // .on("mouseout", function(d){
	        //     d3.select(this)
	        //     .attr('r', 10)
	        //     .attr('fill','black')
	        //     .attr('fill-opacity', 1);
	        //     // .style('stroke-width',1);

	        //     tooltip.transition()
	        //          .duration(500)
	        //          .style("opacity", 0);
	        // });


	    //EXIT SELECTION 
	    nodes.exit().remove()
	}

export default audioFeature;