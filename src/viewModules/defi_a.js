import * as d3 from 'd3';

function definition_a(rootDOM, data){
	const margin = {top: 20, right: 10, bottom: 20, left: 10},
	        width = 650 - margin.left - margin.right,
	        height = 300 - margin.top - margin.bottom;

	const plot4 = d3.select('.definition')
		.append('div')
		.attr('width',width)
		.attr('height',height)
		.attr("transform","translate(" + margin.left + "," + margin.top + ")")

	const e = plot4.append('div')
		.attr('class','feature-defi')
		.attr('width',width)
		.attr('height',300)

	e.append('text')
		.style('text-anchor','left')
		.html(
			'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.'
			)

}

export default definition_a;