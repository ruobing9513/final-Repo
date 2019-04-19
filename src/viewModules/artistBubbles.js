import * as d3 from 'd3';

	function artistBubbles(rootDOM, data){

				const margin = {top: 60, right: 60, bottom: 60, left: 60},
				    width = 860 - margin.left - margin.right,
				    height = 800 - margin.top - margin.bottom;

				const plot2 = d3.select('.artistBubble-container')
					.append('svg')
					.attr('width', width)
					.attr('height', height)
					.attr("transform","translate(" + margin.left + "," + margin.top + ")")

				// console.log(data);

				data.forEach(d=>{
					d.x = Math.random()*width-100;
					d.y = Math.random()*height-100;
				});

				console.log(data);

				//TOOLTIP 

				const tooltip = d3.select('.tooltip-container').append("div")
					.attr("class", "tooltip_bubble")
					.attr('width', 50)
					.style("opacity", 0);

				//COLOR SCALE 

				const min = d3.min(data, d=>d.follower); 

				console.log(min); //[42101, 41031520]

				const max = d3.max(data, d=>d.follower); 

				console.log(max);

				const colorScale = d3.scaleLinear()
					.domain([min,max])
					.range(['#FFEFD5','#9E3B71']);


				//UPDATE SELECTION 
				const nodes = plot2.selectAll('.node')
					.data(data);

				nodes.select('circle')
					.style('fill','black')
					.attr('r',2);

				//ENTERING SELECTION 
				const nodesEnter = nodes.enter()
					.append('g')
					.attr('class','node');

				nodesEnter.append('circle')
					.attr('r', d=>d.appearance)
					.style('fill-opacity',0.9)
					.style('fill',d=>colorScale(d.follower));

				//ENTERING AND UPDATE
				nodes.merge(nodesEnter)
					.attr('transform', d => `translate(${d.x}, ${d.y})`);

				nodes.merge(nodesEnter)
					.select('circle')

					.transition()
					.duration(200)
					.attr('r', d=>d.appearance*2.8)
				
				nodes.merge(nodesEnter)
					.on("mouseenter", function(d){
						d3.select(this)
						.style('fill','#FF6347')
						.attr('fill-opacity', 1)
						
					    tooltip.transition()
					          .duration(200)
					          .style('opacity',1)
					    tooltip
					    	//TRACK IMAGE AND RANKING DOESNT MATCH WITH THE TRACK AND ARTIST 
					          .html("<p class='track'style='color:black;text-align:center'> <span style='font-size: 35px'>" + d.artist 
					          	+ "</span></p>" ); 
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
					})


				//CREATE FORCE SIMULATION 

				const simulation = d3.forceSimulation();

				// const forceX = d3.forceX().x(width/3);
				// const forceY = d3.forceY().y(height/2);
				const forceCollide = d3.forceCollide().radius(d=>d.appearance*3);

				simulation
					// .force('x', forceX)
					// .force('y', forceY)
					.force('collide', forceCollide)
					.force('center', d3.forceCenter(width/2, height/2))
					.force('charge', d3.forceManyBody().strength(8))
					.nodes(data) //start the simulation
					.on('tick', () => {
						nodes.merge(nodesEnter)
							.attr('transform', d => `translate(${d.x}, ${d.y})`);
					})
					.alpha(1);
	}

export default artistBubbles;
	

