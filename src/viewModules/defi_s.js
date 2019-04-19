import * as d3 from 'd3';

function definition_s(rootDOM, data){
	const margin = {top: 20, right: 10, bottom: 20, left: 10},
	        width = 650 - margin.left - margin.right,
	        height = 300 - margin.top - margin.bottom;

	const plot4 = d3.select('.definition')
		.append('div')
		.attr('width',width)
		.attr('height',height)
		.attr("transform","translate(" + margin.left + "," + margin.top + ")")

	const s = plot4.append('div')
		.attr('class','feature-defi')
		.attr('width',width)
		.attr('height',300)

	s.append('text')
		.style('text-anchor','left')
		.html(
			'<p style="color:#9E3B71;font-weight:bold;font-size:22px">Rap is dope, but a balance of the actual music and spoken lyrics are the best.</p>'
			+ '<p>Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks</p>'
			)

}

export default definition_s;