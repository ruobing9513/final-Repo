import * as d3 from 'd3';

function definition_v(rootDOM, data){
	const margin = {top: 20, right: 10, bottom: 20, left: 10},
	        width = 650 - margin.left - margin.right,
	        height = 300 - margin.top - margin.bottom;

	const plot4 = d3.select('.definition')
		.append('div')
		.attr('width',width)
		.attr('height',height)
		.attr("transform","translate(" + margin.left + "," + margin.top + ")")

	const v = plot4.append('div')
		.attr('class','feature-defi')
		.attr('width',width)
		.attr('height',300)

	v.append('text')
		.style('text-anchor','left')
		.html(
			'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).'
			)

}

export default definition_v;