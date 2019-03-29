//Utility functions for parsing metadata, migration data, and country code
import {nest, sum} from 'd3';

function parseTrack(d){
	return {
		year: +d.Year,
		artists_id: d.artists_id,
		artist: d.artists,
		track_name: d.track_name,
		follower: +d.follower,
		genre: d.genre,
		popularity: +d.popularity,
		year: +d.year,
		album: d.Album,
		track_id: d.track_id,
		ranking: +d.ranking,
		danceability: +d.danceability,
		energy: +d.energy,
		loudness: +d.loudness,
		speechiness: +d.speechiness,
		acousticness: +d.acousticness,
		instrumentalness: +d.instrumentalness,
		liveness: +d.liveness,
		valence: +d.valence,
		tempo: +d.tempo,
		Preview: d.Preview_url,
		track_image: d.track_image,
		x: Math.random() * 900,
    	y: Math.random() * 800
	}
}

function parseArtist(d){

	return {
		followers_total: +d.followers_total,
		genres: d.artists_genres,
		artists_id: d.artists_id,
		artist_image: d.image_url,
		artists_name: d.artists_name,
		artists_popularity: +d.artists_popularity

	}
}

function transform(year, data){
	const musicFiltered = data.filter(d => d.year === year);

	return musicFiltered

}

function groupByYear(data){
	const yearData = d3.nest()
		.key(d => d.year)
		// .rollup(values => d3.sum(values, d => d.value))
		.entries(musicAugmented);

	return yearData;
	console.log(yearData);
}


function artistInfo(data){
	const artistsData = d3.nest()
		.key(d => d.artists_id)
		// .key(d => d.values.length)
		.entries(musicAugmented)
		.map(group => {
			return {
				artist: group.key, //converting into numbers
				appearance: group.values.length

			}
		});

		return artistInfo;
		console.log(artistInfo);
}


export {
	parseTrack,
	parseArtist,
	groupByYear,
	artistInfo
}