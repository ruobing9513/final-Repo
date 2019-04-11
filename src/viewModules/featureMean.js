import * as d3 from 'd3';

	function drawTooltip(data, rootDOM){
	    const margin = {top: 20, right: 20, bottom: 20, left: 20},
	        width = 800 - margin.left - margin.right,
	        height = 60 - margin.top - margin.bottom;

	        const xScale = d3.scaleLinear().range([10, width]).domain([0,1]);

	        const tooltip = d3.select('.plot-1').append("svg")
	          .attr("class", "tooltip")
	          .attr('width', 50)
	          .style("opacity", 0);

	        //danceability  
	        const danceability = d3.select('.plot-1')
	            .append('svg')
	            .attr('width', width + 300)
	            .attr('height', height + 20)
	            .attr("transform","translate(" + margin.left + "," + margin.top + ")")

	        const danceability_axis = danceability.append("g")
	           .attr('transform', 'translate(0,' + height + ')') 
	           .attr("class", "axis")
	           .call(d3.axisBottom()
	            .ticks(10)
	            // .tickSize(-width)
	            .scale(xScale));

	        danceability.selectAll('.plot-1')
	            .data(data)
	            .enter()
	            .append('circle')
	            .attr('r',5)
	            .attr('cx', d=> xScale(d.danceability_mean))
	            .attr('cy', 20)
	            .style('fill','#F5F5F5')

	        //energy 
	        const energy = d3.select('.plot-1')
	            .append('svg')
	            .attr('width', width + 100)
	            .attr('height', height + 20)
	            .attr("transform","translate(" + margin.left + "," + margin.top + ")")

	        const energy_axis = energy.append("g")
	           .attr('transform', 'translate(0,' + height + ')') 
	           .attr("class", "axis")
	           .call(d3.axisBottom()
	            .ticks(10)
	            // .tickSize(-width)
	            .scale(xScale));

	        energy.selectAll('.plot-1')
	            .data(data)
	            .enter()
	            .append('circle')
	            .attr('r',5)
	            .attr('cx', d=> xScale(d.energy_mean))
	            .attr('cy', 20)
	            .style('fill','green')

	        //acousticness 
	        const acousticness = d3.select('.plot-1')
	            .append('svg')
	            .attr('width', width + 100)
	            .attr('height', height + 20)
	            .attr("transform","translate(" + margin.left + "," + margin.top + ")")

	        const acousticness_axis = acousticness.append("g")
	           .attr('transform', 'translate(0,' + height + ')') 
	           .attr("class", "axis")
	           .call(d3.axisBottom()
	            .ticks(10)
	            // .tickSize(-width)
	            .scale(xScale));

	        acousticness.selectAll('.plot-1')
	            .data(data)
	            .enter()
	            .append('circle')
	            .attr('r',5)
	            .attr('cx', d=> xScale(d.acousticness_mean))
	            .attr('cy', 20)
	            .style('fill','black')

	        //acousticness 
	        const valence = d3.select('.plot-1')
	            .append('svg')
	            .attr('width', width + 100)
	            .attr('height', height + 20)
	            .attr("transform","translate(" + margin.left + "," + margin.top + ")")

	        const valence_axis = valence.append("g")
	           .attr('transform', 'translate(0,' + height + ')') 
	           .attr("class", "axis")
	           .call(d3.axisBottom()
	            .ticks(10)
	            // .tickSize(-width)
	            .scale(xScale));

	        valence.selectAll('.plot-1')
	            .data(data)
	            .enter()
	            .append('circle')
	            .attr('r',5)
	            .attr('cx', d=> xScale(d.valence_mean))
	            .attr('cy', 20)
	            .style('fill','orange')

	        //speechiness
	        const speechiness = d3.select('.plot-1')
	            .append('svg')
	            .attr('width', width + 100)
	            .attr('height', height + 20)
	            .attr("transform","translate(" + margin.left + "," + margin.top + ")")

	        const speechiness_axis = speechiness.append("g")
	           .attr('transform', 'translate(0,' + height + ')') 
	           .attr("class", "axis")
	           .call(d3.axisBottom()
	            .ticks(10)
	            // .tickSize(-width)
	            .scale(xScale));

	        speechiness.selectAll('.plot-1')
	            .data(data)
	            .enter()
	            .append('circle')
	            .attr('r',5)
	            .attr('cx', d=> xScale(d.speechiness_mean))
	            .attr('cy', 20)
	            .style('fill','blue')

	        //Liveness
	        const liveness = d3.select('.plot-1')
	            .append('svg')
	            .attr('width', width + 100)
	            .attr('height', height + 20)
	            .attr("transform","translate(" + margin.left + "," + margin.top + ")")

	        const liveness_axis = liveness.append("g")
	           .attr('transform', 'translate(0,' + height + ')') 
	           .attr("class", "axis")
	           .text("data")
	           .call(d3.axisBottom()
	            .ticks(10)
	            // .tickSize(-width)
	            .scale(xScale));

	        liveness.selectAll('.plot-1')
	            .data(data)
	            .enter()
	            .append('circle')
	            .attr('r',5)
	            .attr('cx', d=> xScale(d.liveness_mean))
	            .attr('cy', 20)
	            .style('fill','purple')
	}

export default drawTooltip;


