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
			'<p style="color:#9E3B71;font-weight:bold;font-size:22px">Hey, music is getting a bit sadder.</p>'
			+ '<p>Our reaction to music is also emotional. Some of it makes us happy, and some of it makes us sad, with songs falling all across the spectrum between happy and sad.</p>'
			+ '<p>You might remember “valence” from high school chemistry. It has to do with how many electrons an atom will lose, gain, or share when it joins with another atom. Psychologists put a spin on that concept, using the word “valence” to describe whether something is likely to make someone feel happy (positive valence) or sad (negative valence). Valence is a measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).</p>'
			+ '<p>Over the years, people are still interested in happy and positive songs; when we dig into the nitty-gritty of the data behind those songs, those hot songs are becoming a bit sadder, despite they are energetic and danceable.</p>'
			)

}

export default definition_v;