import * as d3 from 'd3';

	function cluster(data, rootDOM){

		//data
		//[{}, {}, {}...]x9
			const margin = {top: 40, right: 40, bottom: 40, left: 40},
			    width = 490 - margin.left - margin.right,
			    height = 250 - margin.top - margin.bottom;

		    const xScale = d3.scaleLinear().range([10, width]).domain([0,100]);
		    const yScale = d3.scaleLinear().range([height, 0]).domain([20,105]);

			data.forEach(d=>{
				d.x = xScale(d.ranking);
				d.y = yScale(d.popularity);
				// d.year = d.year;
			});

			const colorScale = d3.scaleLinear()
				.domain([1,100])
				.range(['#D4559A','black']);

			const plot1 = d3.select('.ranking-container')
				.append('svg')
				.classed('chart',true)
				.attr('width', 400)
				.attr('height', 250)
				.attr("transform","translate(" + margin.left + "," + margin.top + ")")

			//TOOLTIP 

			const tooltip = d3.select('.ranking-container').append("div")
				.attr("class", "tooltip")
				.attr('width', 50)
				.style("opacity", 0);

			const year_display = d3.select('.ranking-container').append("div")
				.attr('class','year')
				.style('opacity',1);

			// year_display.append('text')
			// 	.style('text-anchor','middle')
			// 	.html(d.year);

			//UPDATE SELECTION 
			const nodes = plot1.selectAll('.node')
				.data(data);

			nodes.select('circle')
				.style('fill','black')
				.attr('r',0);

			//ENTERING SELECTION 
			const nodesEnter = nodes.enter()
				.append('g')
				.attr('class','node');

			nodesEnter.append('circle')
				.attr('class', 'node')
				.style('stroke-width',0)
				.style('stroke', 'black')
				.style('fill',d=>colorScale(d.ranking));

			//ENTERING AND UPDATE
			nodes.merge(nodesEnter)
				.attr('transform', d => `translate(${d.x}, ${d.y})`);

			nodes.merge(nodesEnter)
				.select('circle')

				.transition()
				.duration(200)
				.attr('r', 5)
			
			nodesEnter
				.on("mouseenter", function(d){
					d3.select(this)
					.style('stroke-width',2)
					.style('stroke', 'black')
					.attr('r', 8)
					.attr('fill-opacity', 1)
					
				    tooltip.transition()
				          .duration(200)
				          .style('opacity',1)
				    tooltip
				    	//TRACK IMAGE AND RANKING DOESNT MATCH WITH THE TRACK AND ARTIST 
				          .html("<p>" 
				          	+ "<span style='color:#9E3B71;font-weight:bold;font-size:22px'>" + d.year + "</span>"
				          	+ "<br/>" + "Rank: " + d.ranking + "<br/>"
				          	+d.track_name + " - " + d.artist_display + "<br/>" 
				          	+ "<br/>" )
				          .style("left", d3.event.pageX + 50 + "px")
				          .style("top", d3.event.pageY + "px");
				    year_display
				    	.html("<p style='color:black;font-weight:bold;font-size:30px'>" + d.year + "</p>");
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
				})


			//CREATE FORCE SIMULATION 

			const simulation = d3.forceSimulation();

			const forceX = d3.forceX().x(width/3);
			const forceY = d3.forceY().y(height/3);
			const forceCollide = d3.forceCollide().radius(6);

			simulation
				.force('x', forceX)
				.force('y', forceY)
				.force('collide', forceCollide)
				.force('center', d3.forceCenter(width / 2.5, height/2.5))
				// .force('charge', d3.forceManyBody().strength(d=>d.popularity))
				// .force('link', forceLink)
				.nodes(data) //start the simulation
				.on('tick', () => {
					nodes.merge(nodesEnter)
						.attr('transform', d => `translate(${d.x}, ${d.y})`);
				})
				.alpha(1);

			

	}

export default cluster;