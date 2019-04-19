import * as d3 from 'd3';
import definition_l from './defi_l.js';

	function liveness(rootDOM, data){

	    //data
	    //[{}, {}, {}...]x9
	    const margin = {top: 20, right: 10, bottom: 20, left: 10},
	        width = 900 - margin.left - margin.right,
	        height = 500 - margin.top - margin.bottom;

	    const xScale = d3.scaleLinear().range([40, width]).domain([0,103]);
	    const yScale = d3.scaleLinear().range([height, 20]).domain([2009,2018]);

	    //UPDATE SELECTION 
	    const plot3 = d3.select('.feature-container')
	        .append('svg')
	        .attr('width', width)
	        .attr('height', height + 100)
	        .attr("transform","translate(" + margin.left + "," + margin.top + ")")

	    const xAxis = plot3.append("g")
	    	.attr('transform', 'translate(0,' + height + ')') 
	    	.attr("class", "xAxis")
	   		.html('ranking')
	    	.call(d3.axisBottom()
	        .ticks(10)
	        // .tickSize(-width)
	        .scale(xScale));

	    plot3.append('text')
	    	.attr("transform","translate(" + (width - 50) + " ," + (height + margin.top + 20) + ")") 
	       	.style("text-anchor", "middle")
	       	.text("Ranking");

	    // Add the Y Axis
	    const yAxis = plot3.append("g")
	        .attr("class", "yAxis")
	        .attr('transform', 'translate(40,0)')
	        .call(d3.axisLeft()
	        	.tickFormat(d3.format("d"))
	        	.scale(yScale));

	    plot3.append('text')
	    	.attr("transform","rotate(-90)") 
	    	.attr("y", 0 - margin.left)
	    	.attr("x",0 - (height))
	    	.attr("dy", "1em")
	       	.style("text-anchor", "middle")
	       	.text("Year");

	    const tooltip  = d3.select('.tooltip-feature').append("div")
	        .attr("class", "tooltip_feature")
	        .attr('width', 80)
	        .style("opacity", 0);

	    const text_defi = d3.select('.feature-container').append('div')
	    	.attr('class','feature-defi')
	    	.attr('width',600)
	    	.attr('height',300);

	   	text_defi.append('text')
	   		.html(definition_l());

	    const colorScale = d3.scaleLinear()
	        .domain([0,1])
	        .range(['#FFFACD',"#DC143C"]);

	    //UPDATE SELECTION
	    const nodes = plot3.selectAll('.feature-container')
	        .data(data);

	    console.log(data);

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
	        .style('fill', d=>colorScale(d.liveness));

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
	                  .html(
	                  	//image
                  		"<img src='"+d.track_image+"'/>" 
	                  	+ "<p class='track'> <span style='font-size: 28px'>" + d.track_name + "</span>"
	                  	+ "<br/>" + d.artist_display + "</p>" 
	                  	+ "<p class='track'>" + "No." + "<span style='color: #DC143C'>" + d.ranking + "</span>" 
	                  	+ " of Hot 100 Songs in " +  "</span>"
	                  	+ "<span style='color: #DC143C'>" + d.year + "</span>" + "</p>"
	                  	//feature attr
	                    + 'Danceability: ' + d.danceability 
	                    + "<br/>" + 'Energy: ' + d.energy 
	                    + "<br/>" + 'Speechiness: ' + d.speechiness
	                    + "<br/>" + 'Valence: ' + d.valence 
	                    + "<br/>" + 'Acousticness: ' + d.acousticness
	                    + "<br/>" + '<span style="color:#DC143C" align="center">' + 'Liveness: ' + d.liveness + "</span>"
	                    //audio
	                    + "<br/>" + "<audio controls>" + "<source src=" + "'" +d.preview+ "'" + " type=" + "'audio/mpeg'>"
	                    );
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

export default liveness;