import * as d3 from 'd3';

	function trackRanking(data, rootDOM, key){

		const margin = {top: 20, right: 20, bottom: 20, left: 20},
		    width = 900 - margin.left - margin.right,
		    height = 400 - margin.top - margin.bottom;

		const xScale = d3.scaleLinear().range([10, width+150]).domain([0,100]);
		const yScale = d3.scaleLinear().range([height, 0]).domain([10,105]);

		const svg = d3.select('.ranking-container')
			.classed('plot',true)
			.selectAll('svg')
			.data([1])

		const xAxis = svg.append("g")
	       .attr('transform', 'translate(0,' + height + ')') 
	       .attr("class", "xAxis")
	       .call(d3.axisBottom()
	       	.ticks(10)
	       	// .tickSize(-width)
	       	.scale(xScale));

	    const tooltip = d3.select('.plot-1').append("div")
	      .attr("class", "tooltip")
	      .attr('width', 50)
	      .style("opacity", 0);

	    const svgEnter = svg.enter()
	    	.append('svg')
	    	.append('g')
	    	.attr('class','plot')

	    const plot = svg.merge(svgEnter)
			.attr('width', width + 300)
			.attr('height', height + 100)
			.select('.plot')
			.attr("transform","translate(" + margin.left + "," + margin.top + ")")

		//UPDATE SELECTION
		const nodes = plot.selectAll('.ranking-container')
			.data(data)

		nodes.exit().remove(); 

		//ENTER SELECTION 
		const nodesEnter = nodes.enter()
			.append('g')
			.attr('class', 'node')

		nodesEnter.append('image')
			.attr('cx', d=>xScale(d.ranking))
			.attr('cy', d=>yScale(d.popularity))
			.attr('class', 'node_image')
			.attr("xlink:href", d=>d.track_image);

		//ENTER AND UPDATE SELECTION, MERGE 
		nodesEnter
			.transition()
			.attr('transform', d => `translate(${xScale(d.ranking)} , ${yScale(d.popularity)})`);

		nodesEnter
			.select('circle')

			.transition()
			.duration(2000)
			.attr('r',10);

		nodesEnter
			.on("mouseenter", function(d){
				d3.select(this)
				.style('fill','#FF6347')
				.attr('r',10)
				.attr('fill-opacity', .8)
				
			    tooltip.transition()
			          .duration(200)
			          .style('opacity',1)
			    tooltip
			    	//TRACK IMAGE AND RANKING DOESNT MATCH WITH THE TRACK AND ARTIST 
			          .html("<h1>" + "Rank: " + d.ranking + "</h1>" 
			          	+d.track_name + " - " + d.artist_display + "<br/>" 
			          	+ "<br/>" + "<img src='"+d.track_image+"'/>"); 
			})

			.on("mouseout", function(d){
				d3.select(this)
				.attr('r', 10)
				.style('fill','black')
				.attr('fill-opacity', 1);
				// .style('stroke-width',1);

			    tooltip.transition()
			         .duration(500)
			         .style("opacity", 0);
			});

		plot.selectAll('.node')
			.data(data)
			.transition()
			.attr('cx', d=>xScale(d.ranking))
			.attr('cy', d=>yScale(d.popularity));
	}

export default trackRanking;