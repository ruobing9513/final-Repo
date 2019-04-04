import {
	parseTrack,
	parseArtist
} from './utl';

import {csv} from 'd3';

const trackPromise = csv('trackinfo.csv', parseTrack);
const artistPromise = csv('artist.csv', parseArtist);

const dataCombined = Promise.all([
		trackPromise,
		artistPromise,
	])
	.then(([track, artist]) => {

		//Convert artistcsv to a map
		const artist_tmp = artist.map(d =>{
			return [d.artists_id, d]
		});

		// console.log(artist_tmp);
		const artistMap = new Map(artist_tmp);
		console.log(artistMap);

		const musicAugmented = trackinfo.map(d => {

			const artist_id = artistMap.get(d.artists_id);
			const artist_image = artistMap.get(d.artist_image);
			const artist_followers_total = artistMap.get(d.followers_total);
			const artists_popularity = artistMap.get(d.artists_popularity);
			const artist_genre = artistMap.get(d.genres);

			if (artist_id){
				d.artists_id = artist_id
			}
			if (artist_image){
				d.artists_image = artist_image
			}
			if (artist_followers_total){
				d.artist_followers_total = artist_followers_total
			}
			if (artists_popularity){
				d.artists_popularity = artists_popularity
			}
			if (artist_genre){
				d.artist_genre = artist_genre
			}

		
		return d;

		});
		console.log(musicAugmented);

		return musicAugmented;
	});

export {
	trackPromise,
	artistPromise,
	dataCombined,
}