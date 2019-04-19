import * as d3 from 'd3';

function definition_e(rootDOM, data){
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
			'<p style="color:#9E3B71;font-weight:bold;font-size:22px">Yes, people love energetic songs.</p>'
			+ "<p>The Echo Nest's definition of energetic includes loudness, beats, structural changes and the sounds of instruments. And that shows that while music isn't getting much faster, it is getting more energetic.</p>"
			+ '<p>Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.</p>'
			
			)

}

export default definition_e;