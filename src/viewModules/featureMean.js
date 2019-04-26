import * as d3 from 'd3';

	function drawTooltip(rootDOM, data){
	    const margin = {top: 20, right: 20, bottom: 20, left: 10},
	        width = 550 - margin.left - margin.right,
	        height = 60 - margin.top - margin.bottom;

	        const xScale = d3.scaleLinear().range([10, width]).domain([0,1]);

	        const tooltip = d3.select('.tooltip-container').append("svg")
	          .attr("class", "tooltip")
	          .attr('width', 50)
	          .style("opacity", 0);

	        const min = d3.min(data, d=>d.follower); 

	        const max = d3.max(data, d=>d.follower); 

	        const colorScale = d3.scaleLinear()
	        	.domain([min,max])
	        	.range(['#FFEFD5','#9E3B71']);

	        //danceability  
	        const danceability = d3.select('.tooltip-container')
	            .append('svg')
	            .attr('width', width + 100)
	            .attr('height', height + 30)
	            .attr("transform","translate(" + margin.left + "," + margin.top + ")")

	        const danceability_axis = danceability.append("g")
	           .attr('transform', 'translate(0,' + height + ')') 
	           .attr("class", "axis")
	           .call(d3.axisBottom()
	            .ticks(10)
	            // .tickSize(-width)
	            .scale(xScale));

	        danceability.append('text')
	        	.attr("transform","translate(" + (width + 10) + " ," + (height + 10) + ")")
	        	.attr('class','x-title') 
	           	.style("text-anchor", "left")
	           	.style('fill', 'black')
	           	.text("Danceability");

	        danceability.selectAll('.tooltip-container')
	            .data(data)
	            .enter()
	            .append('circle')
	            .attr('r',5)
	            .attr('cx', d=> xScale(d.danceability_mean))
	            .attr('cy', 20)
	            .style('opacity',0.6)
	            .style('fill',d=>colorScale(d.follower))
	        console.log(data);

	        //energy 
	        const energy = d3.select('.tooltip-container')
	            .append('svg')
	            .attr('width', width + 100)
	            .attr('height', height + 30)
	            .attr("transform","translate(" + margin.left + "," + margin.top + ")")

	        const energy_axis = energy.append("g")
	           .attr('transform', 'translate(0,' + height + ')') 
	           .attr("class", "axis")
	           .call(d3.axisBottom()
	            .ticks(10)
	            // .tickSize(-width)
	            .scale(xScale));

	        energy.append('text')
	        	.attr("transform","translate(" + (width + 10) + " ," + (height + 10) + ")")
	        	.attr('class','x-title')  
	           	.style("text-anchor", "left")
	           	.style('fill', 'black')
	           	.style('stroke-width','5')
	           	.text("Energy");

	        energy.selectAll('.tooltip-container')
	            .data(data)
	            .enter()
	            .append('circle')
	            .attr('r',5)
	            .attr('cx', d=> xScale(d.energy_mean))
	            .attr('cy', 20)
	            .style('opacity',0.6)
	            .style('fill',d=>colorScale(d.follower))

	        //acousticness 
	        const acousticness = d3.select('.tooltip-container')
	            .append('svg')
	            .attr('width', width + 100)
	            .attr('height', height + 30)
	            .attr("transform","translate(" + margin.left + "," + margin.top + ")")

	        const acousticness_axis = acousticness.append("g")
	           .attr('transform', 'translate(0,' + height + ')') 
	           .attr("class", "axis")
	           .call(d3.axisBottom()
	            .ticks(10)
	            // .tickSize(-width)
	            .scale(xScale));

	        acousticness.append('text')
	        	.attr("transform","translate(" + (width + 10) + " ," + (height + 10) + ")")
	        	.attr('class','x-title')  
	           	.style("text-anchor", "left")
	           	.style('fill', 'black')
	           	.text("Acousticness");

	        acousticness.selectAll('.tooltip-container')
	            .data(data)
	            .enter()
	            .append('circle')
	            .attr('r',5)
	            .attr('cx', d=> xScale(d.acousticness_mean))
	            .attr('cy', 20)
	            .style('opacity',0.6)
	            .style('fill',d=>colorScale(d.follower))

	        //acousticness 
	        const valence = d3.select('.tooltip-container')
	            .append('svg')
	            .attr('width', width + 100)
	            .attr('height', height + 30)
	            .attr("transform","translate(" + margin.left + "," + margin.top + ")")

	        const valence_axis = valence.append("g")
	           .attr('transform', 'translate(0,' + height + ')') 
	           .attr("class", "axis")
	           .call(d3.axisBottom()
	            .ticks(10)
	            // .tickSize(-width)
	            .scale(xScale));

	        valence.append('text')
	        	.attr("transform","translate(" + (width + 10) + " ," + (height + 10) + ")")
	        	.attr('class','x-title')  
	           	.style("text-anchor", "left")
	           	.style('fill', 'black')
	           	.text("Valence");

	        valence.selectAll('.tooltip-container')
	            .data(data)
	            .enter()
	            .append('circle')
	            .attr('r',5)
	            .attr('cx', d=> xScale(d.valence_mean))
	            .attr('cy', 20)
	            .style('opacity',0.6)
	            .style('fill',d=>colorScale(d.follower))

	        //speechiness
	        const speechiness = d3.select('.tooltip-container')
	            .append('svg')
	            .attr('width', width + 100)
	            .attr('height', height + 30)
	            .attr("transform","translate(" + margin.left + "," + margin.top + ")")

	        const speechiness_axis = speechiness.append("g")
	           .attr('transform', 'translate(0,' + height + ')') 
	           .attr("class", "axis")
	           .call(d3.axisBottom()
	            .ticks(10)
	            // .tickSize(-width)
	            .scale(xScale));

	        speechiness.append('text')
	        	.attr("transform","translate(" + (width + 10) + " ," + (height + 10) + ")")
	        	.attr('class','x-title')  
	           	.style("text-anchor", "left")
	           	.style('fill', 'black')
	           	.text("Speechiness");

	        speechiness.selectAll('.tooltip-container')
	            .data(data)
	            .enter()
	            .append('circle')
	            .attr('r',5)
	            .attr('cx', d=> xScale(d.speechiness_mean))
	            .attr('cy', 20)
	            .style('opacity',0.6)
	            .style('fill',d=>colorScale(d.follower))

	        //Liveness
	        const liveness = d3.select('.tooltip-container')
	            .append('svg')
	            .attr('width', width + 100)
	            .attr('height', height + 30)
	            .attr("transform","translate(" + margin.left + "," + margin.top + ")")

	        const liveness_axis = liveness.append("g")
	           .attr('transform', 'translate(0,' + height + ')') 
	           .attr("class", "axis")
	           .text("data")
	           .call(d3.axisBottom()
	            .ticks(10)
	            // .tickSize(-width)
	            .scale(xScale));

	        liveness.append('text')
	        	.attr("transform","translate(" + (width + 10) + " ," + (height + 10) + ")")
	        	.attr('class','x-title')  
	           	.style("text-anchor", "left")
	           	// .style('fill', '#9E3B71')
	           	.style('fill','black')
	           	.text("Liveness");

	        liveness.selectAll('.tooltip-container')
	            .data(data)
	            .enter()
	            .append('circle')
	            .attr('r',5)
	            .attr('cx', d=> xScale(d.liveness_mean))
	            .attr('cy', 20)
	            .style('opacity',0.6)
	            .style('fill',d=>colorScale(d.follower))
	}

export default drawTooltip;


