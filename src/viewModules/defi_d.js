import * as d3 from 'd3';

function definition_d(rootDOM, data){
	const margin = {top: 20, right: 10, bottom: 20, left: 10},
	        width = 650 - margin.left - margin.right,
	        height = 300 - margin.top - margin.bottom;

	const plot4 = d3.select('.definition')
		.append('div')
		.attr('width',width)
		.attr('height',height)
		.attr("transform","translate(" + margin.left + "," + margin.top + ")")

	const d = plot4.append('div')
		.attr('class','feature-defi')
		.attr('width',width)
		.attr('height',300)
		.style('fill', 'yellow')

	d.append('text')
		.style('text-anchor','left')
		.html(
			'<p style="color:#9E3B71;font-weight:bold;font-size:22px">Dance? People love danceable music all the time.</p>'
			+ '<p>Something to unite the years: music has always kept around the same level of danceability.</p>'
			+ '<p>Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity, and how likely songs are to instigate twisting, potato-mashing, vogueing, daggering or all four. A value of 0.0 is least danceable and 1.0 is most danceable.</p>'
			+ '<p>From Gotye’s Somebody That I Used To Know which ranked first in 2012, to Ed Sheeran’s Shape of You which ranked the first in 2017, they are probably equally danceable, however, for different genres.</p>'
			)

}

export default definition_d;