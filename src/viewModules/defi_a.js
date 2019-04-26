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
			'<p style="color:#9E3B71;font-weight:bold;font-size:22px">Music has got less acoustic over the decades.</p>'
			+ '<p style="color:#9E3B71;font-weight:bold;font-size:22px">Thanks to the introduction of new technology.</p>'
			+ '<p>The Echo Nest rates songs by how many prominent acoustic sounds they have versus how electronic they are: acoustic guitars and tambourines versus synthesizers and drum machines, for example. The confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.</p>'
			+ '<p>New technologies provide more possibilities to the composition of a song. Especially for dance pop and EDM, most of them are relatively low or extremely low in acousticsness while much higher than the rest of the genres in terms of energy.</p>'
			+ '<p>We all have an instinctive sense that music has sounded more electronic, and less acoustic, over time. We can trust our ears, this time around.</p>'
			)

}

export default definition_a;