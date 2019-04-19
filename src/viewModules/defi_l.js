import * as d3 from 'd3';

function definition_l(rootDOM, data){
	const margin = {top: 20, right: 10, bottom: 20, left: 10},
	        width = 650 - margin.left - margin.right,
	        height = 300 - margin.top - margin.bottom;

	const plot4 = d3.select('.definition')
		.append('div')
		.attr('width',width)
		.attr('height',height)
		.attr("transform","translate(" + margin.left + "," + margin.top + ")")

	const l = plot4.append('div')
		.attr('class','feature-defi')
		.attr('width',width)
		.attr('height',300)

	l.append('text')
		.style('text-anchor','left')
		.html(
			'<p style="color:#9E3B71;font-weight:bold;font-size:22px">Live music, isn’t that great?</p>'
			+ '<p style="color:#9E3B71;font-weight:bold;font-size:22px">Do we care? Nah, not that much. </p>'
			+ '<p>Liveness detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.</p>'
			)

}

export default definition_l;