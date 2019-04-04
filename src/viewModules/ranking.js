import * as d3 from 'd3';

function trackRanking(){
	function exportFunction(data, rootDOM, key){

		const margin = {top: 20, right: 20, bottom: 20, left: 20},
		    width = 900 - margin.left - margin.right,
		    height = 400 - margin.top - margin.bottom;

		const xScale = d3.scaleLinear().range([10, width+150]).domain([0,100]);
		const yScale = d3.scaleLinear().range([height, 0]).domain([0,150]);

		//UPDATE SELECTION 
		const plot1 = d3.select('.ranking-container')
			.append('svg')
			.attr('width', width + 300)
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

		//UPDATE SELECTION
		const nodes = plot1.selectAll('.ranking-container')
			.data(data)

		nodes.select('circle')
			.style('fill','black')
			.attr('r',2)

		//ENTER SELECTION 
		const nodesEnter = nodes.enter()
			.append('g')
			.attr('class', 'node')

		nodesEnter.append('circle')
			.attr("r", 1)
			.style('stroke-width',1)
			.style('stroke','black');

		nodesEnter.append('image')
			.attr('class', 'node_image')
			.attr("xlink:href", d=>d.track_image);
			// .attr("x", function(d) { return -25;})
	  //       .attr("y", function(d) { return -25;});

		//ENTER AND UPDATE SELECTION, MERGE 
		nodes.merge(nodesEnter)
			.attr('cx',0)
			.attr('cy', d=>yScale(d.popularity))
			.transition()
			.attr('transform', d => `translate(${xScale(d.ranking)} , ${yScale(d.popularity)})`);

		nodes.merge(nodesEnter)
			.select('circle')

			.transition()
			.duration(2000)
			.attr('r',7);

		nodes.merge(nodesEnter)
			.on("mouseenter", function(d){
				d3.select(this)
				.style('fill','#FF6347')
				.attr('r',7)
				.attr('fill-opacity', .8)
				
			    tooltip.transition()
			          .duration(200)
			          .style('opacity',1)
			    tooltip
			    	//TRACK IMAGE AND RANKING DOESNT MATCH WITH THE TRACK AND ARTIST 
			          .html("<h1>" + "Rank: " + d.ranking + "</h1>" 
			          	+d.track_name + " - " + d.artists_display + "<br/>" 
			          	+ "<br/>" + "<img src='"+d.track_image+"'/>"); 
			})

			.on("mouseout", function(d){
				d3.select(this)
				.attr('r', 7)
				.style('fill','black')
				.attr('fill-opacity', 1);
				// .style('stroke-width',1);

			    tooltip.transition()
			         .duration(500)
			         .style("opacity", 0);
			});


		//EXIT SELECTION 
		nodes.exit().remove()

	return exportFunction;
	}
}

export default trackRanking;