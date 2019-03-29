import * as d3 from 'd3';

function ranking(){

	function exportFunction(data, rootDOM, key){
		const margin = {top: 60, right: 60, bottom: 60, left: 60},
		    width = 900 - margin.left - margin.right,
		    height = 400 - margin.top - margin.bottom;

		const xScale = d3.scaleLinear().range([0, width]).domain([0,100]);
		const yScale = d3.scaleLinear().range([height, 0]).domain([0,130]);

		//UPDATE SELECTION 
		const plot1 = d3.select('.ranking-container')
			.append('svg')
			.attr('width', width + 100)
			.attr('height', height + 100)
			.attr("transform","translate(" + margin.left + "," + margin.top + ")")

		const xAxis = plot1.append("g")
	       .attr('transform', 'translate(0,' + height + ')') 
	       .attr("class", "xAxis")
	       .call(d3.axisBottom()
	       	.ticks(10)
	       	// .tickSize(-width)
	       	.scale(xScale));

	    const tooltip = d3.select('.ranking-container').append("div")
	      .attr("class", "tooltip")
	      .attr('width', 50)
	      .style("opacity", 0);

		  // Add the Y Axis
		// const yAxis = plot1.append("g")
	 //       .attr("class", "y axis")
	 //       .call(d3.axisLeft().scale(yScale));

		const nodes = plot1.selectAll('.node')
			.data(data);

		nodes.select('circle')
			.style('fill', 'black')
			.transition()
			.style('fill', 'green');

		const nodesEnter = nodes.enter()
			.append('g')
			.attr('class', 'node')
			.attr('transform', d => `translate(${xScale(d.ranking)} , ${yScale(d.popularity)})`);
			//change later, test

		nodesEnter.append('circle')
			.style('stroke','red')
			.attr('r',2)
			// .style('stroke-width',2)
			// .style('fill', 'black')

		//EXIT
		nodes.exit().remove();

		//UPDATE + ENTER
		nodes.merge(nodesEnter)
			.transition()
			.duration(500)
			
		// nodes.merge(nodesEnter)
		// 	.select('text')
		// 	.text(d=>d.track_name);
		nodes.merge(nodesEnter)
			.select('circle')
			.data(data)

			.transition()
			.duration(500)
			.style('stroke','red')
			.style('fill','black')
			.style('fill-opacity',.8)
			.style('stroke-width',.8)
			.attr('r', 10);

		nodesEnter  
			.on("mouseenter", function(d){
				d3.select(this)
				.style('fill','red')
				.attr('r',20)
				.attr('fill-opacity', 1)
				// .style('stroke-width',2);
				
			    tooltip.transition()
			          .duration(200)
			          .style('opacity',1)
			    tooltip
			    	//TRACK IMAGE AND RANKING DOESNT MATCH WITH THE TRACK AND ARTIST 
			          .html(d.track_name + " - " + d.artist + "<br/>" + "Ranking:" + d.ranking
			            +"<br/>" + "<br/>" + "<img src='"+d.track_image+"'/>"); 
			})

			.on("mouseout", function(d){
				d3.select(this)
				.attr('r', 10)
				.attr('fill','black')
				.attr('fill-opacity', 1);
				// .style('stroke-width',1);

			    tooltip.transition()
			         .duration(500)
			         .style("opacity", 0);
			});
	}

	return exportFunction;
}

export default ranking;