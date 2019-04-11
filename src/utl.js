//Utility functions for parsing metadata, migration data, and country code
import {nest, filter, max, mean} from 'd3';

function parseTrack(d){
	return {
		year: +d.Year,
		artists_id: d.artists_id,
		artist_display: d.artists_display,
		artist_data: d.artist_data,
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
		preview: d.Preview_url,
		track_image: d.track_image,

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

	const yearData = nest()
		.key(d => d.year)
		.entries(data);
	return yearData;
}

function groupByArtist(data){
	const artistsData = nest()
		.key(d => d.artist_data)
		.entries(data)
		.map(d => {
			return {
			artist: d.key, 
			appearance: d.values.length,
			popularity: max(d.values, d=>d.popularity),
			danceability_mean:mean(d.values, d=>d.danceability),
			energy_mean:mean(d.values, d=>d.energy),
			valence_mean:mean(d.values, d=>d.valence),
			acousticness_mean: mean(d.values, d=>d.acousticness),
			}
		});
	return artistsData;
}

function yearByFeature(data){
	const featureData = nest()
	    .key(d => d.track_id)
	    .entries(data)
	    .map(f=>{
	        return{
	            track:f.key,
	            features: f.values
	        }
	    });
	return featureData;
}

export {
	parseTrack,
	parseArtist,
	groupByYear,
	groupByArtist,
	yearByFeature

}