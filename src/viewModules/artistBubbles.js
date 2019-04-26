import * as d3 from 'd3';

	function artistBubbles(rootDOM, data){

		const simulation = d3.forceSimulation();

		const margin = {top: 60, right: 60, bottom: 60, left: 60},
		    width = 860 - margin.left - margin.right,
		    height = 680 - margin.top - margin.bottom;

		let nodes;

		function exports(rootDOM, data){

		const forceX = d3.forceX().x(width/2);
		const forceY = d3.forceY().y(height/2);
		const forceCollide = d3.forceCollide().radius(d=>d.appearance*3.1);

		simulation
			.force('x', forceX)
			.force('y', forceY)
			.force('collide', forceCollide)

		const xScale = d3.scaleLinear().range([10, width]).domain([0,110]);
		const yScale = d3.scaleLinear().range([height, 0]).domain([10,105]);

		//TOOLTIP 

		const tooltip = d3.select('.artistBubble-tooltip')
			.attr('class', 'artistBubble-tooltip')
			.attr('width',width)
			.attr('height', height)
		const tooltip_img = d3.select('.artistBubble-img');

		//COLOR SCALE 

		const min = d3.min(data, d=>d.follower); 

		const max = d3.max(data, d=>d.follower); 

		const colorScale = d3.scaleLinear()
			.domain([min,max])
			.range(['#FFEFD5','#9E3B71']);

		//UPDATE SELECTION 
		const svg = d3.select('.artistBubble-container').append('svg')
			.attr('width', width)
			.attr('height', height);

		nodes = svg.selectAll('.node')
			.data(data);

		// console.log(data);

		let nodesEnter = nodes.enter()
			.append('g')
			.attr('class','node');
		nodesEnter.append('circle')
			.attr('r', 0)
			.attr('fill', 'black')

			.transition()
			.duration(1000)

			.attr('r', d => d.appearance*2.8)
			.style('fill', d=>colorScale(d.follower));

		nodes = nodesEnter.merge(nodes);
		
		nodes.merge(nodesEnter)
			.on("mouseenter", function(d){
				d3.select(this)
				.attr('fill-opacity', 1)
				.style('stroke-width',1)
				
			    tooltip.transition()
			        .duration(800)
			        .style('opacity',1)

			    tooltip
			        .html(
			        	"<p><span style='font-size: 30px';font-weight:'bold'>" 
			          	+ d.artist + '</br>' + "</span>" 
			          	+ '</br> <span style=color:#9E3B71;font-weight:bold;font-size:16px>Genre: </span>' + d.details[1].genre 
			          	+ '</br> <span style=color:#9E3B71;font-weight:bold;font-size:16px> Numbers of tracks on <b>Hot 100</b> : </span>' + d.appearance
			          	+ '</br> <span style=color:#9E3B71;font-weight:bold;font-size:16px> Spotify followers: </span>' + d.follower
			          	+ "</p>" ); 

			    tooltip_img.transition()
			    	.duration(500)
			    	.style('opacity',1)
			   	tooltip_img
			   		.html("<img class='rounded' src='" + d.details[0].artist_image +"'/>" + '</br>')

			})

		simulation //start the simulation
			.on('tick', () => {
				nodes.merge(nodesEnter)
					.attr('transform', d => `translate(${d.x}, ${d.y})`);
			})
			.nodes(data)
			.alpha(1);
		}

		exports.updateColor = function(colorOption){
			console.log(colorOption);

			switch(colorOption){
			case 'red':
				nodes.select('circle').transition().style('fill','red');
				break;
			case 'blue':
				nodes.select('circle').transition().style('fill','blue');
				break;
			case 'by value':
			default:
				nodes.select('circle').transition().style('fill', d => colorScale(d.danceability_mean));
			}
		}

		return exports;
	}

export default artistBubbles;
	

