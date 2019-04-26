import * as d3 from 'd3';

	function trackRanking(data, rootDOM){

			const margin = {top: 20, right: 20, bottom: 20, left: 20};
			const width = 1200 - margin.left - margin.right;
			const height = 400 - margin.top - margin.bottom;

			const xScale = d3.scaleLinear().range([10, width]).domain([0,110]);
			const yScale = d3.scaleLinear().range([height, 0]).domain([10,105]);


			const svg = d3.select('.ranking-container')
				.attr('class','chart')
				.selectAll('svg')
				.data([1])

			const svgEnter = svg.enter()
				.append('svg')

			svgEnter
				.append('g')
				.attr('class','plot')

			const plot = svg.merge(svgEnter)
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
				.select('.plot')
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

			const tooltip = d3.select('.ranking-container').append("div")
			  .attr("class", "tooltip")
			  .attr('width', width)
			  .style("opacity", 1);

			const nodes = plot.selectAll('.node')
				.data(data)

			nodes.exit().remove();

			const nodesEnter = nodes.enter()
				.append('g')
				.attr('class','node')

			nodesEnter.append('g')
				.attr('class','axis-x')
				.attr("transform", "translate(0," + height + ")");

			nodesEnter.append('image')
				.attr('class','node_image rounded-circle')
				.attr("xlink:href", d=>d.artist_image);


			//update 
			plot.selectAll('.node_image')
				.data(data)
				.transition()
				.duration(1000)
				.attr('transform', d => `translate(${xScale(d.ranking)} , ${yScale(d.popularity)})`);    

			plot.select('.axis-x')
				.call(d3.axisBottom()
				.ticks(10)
				.tickSize(-width)
		       	.scale(xScale))

   		   		.append('text')
   		   		.attr("transform","translate(" + (width-10) + " ," + (height-10) + ")")
   		   		.style("text-anchor", "left")
   	           	.style('fill', 'black')
   	           	.text("Ranking");
		   		

	        plot
	        	.on("click", function(d){
	        		d3.select(this)
	        		.style('fill','#FF6347')
	        		.attr('r',10)
	        		.attr('fill-opacity', .8)
	        		
	        	    tooltip.transition()
	        	          .duration(200)
	        	          .style('opacity',1)
	        	          .style("left", (d3.event.pageX - 34) + "px")
	        	          .style("top", (d3.event.pageY - 12) + "px");
	        	    tooltip
	        	    	//TRACK IMAGE AND RANKING DOESNT MATCH WITH THE TRACK AND ARTIST 
	        	          .html("<h1>" + "Rank: " + d.ranking + "</h1>" 
	        	          	+ "<h1>" + d.year + "</h1>" + 
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

	}

export default trackRanking;