
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
// import {message} from './module1';
import * as d3 from 'd3';

//DATASET IMPORT 
import {
	trackPromise,
	artistPromise,
	dataCombined,
} from './data';

import {
	groupByArtist,
	groupByYear,
	yearByFeature
} from './utl';

//VIEW MODULES 
//ranking cluster 
import cluster from './viewModules/rankCluster';

//bubbles 
import artistBubbles from './viewModules/artistBubbles';
import drawTooltip from './viewModules/featureMean';

//audio feature
import energy from './viewModules/energy_feature';
import danceability from './viewModules/danceability_feature';
import liveness from './viewModules/liveness_feature';
import speechiness from './viewModules/speechiness_feature';
import valence from './viewModules/valence_feature';
import acousticness from './viewModules/acousticness_feature';

import definition_d from './viewModules/defi_d.js';
import definition_l from './viewModules/defi_l.js';
import definition_s from './viewModules/defi_s.js';
import definition_v from './viewModules/defi_v.js';
import definition_e from './viewModules/defi_e.js';
import definition_a from './viewModules/defi_a.js';
//doesnt work 
import colorControls from './viewModules/colorControls';



let originArtist = "Zedd";
let currentYear = 2015;
let currentTrack = "6DCZcSspjsKoFjzjrWoCdn";

//CHECK DATA CONSOLE

// trackPromise.then(track=>console.log(track))
// artistPromise.then(artist=>console.log(artist))
// dataCombined.then(combined=>console.log(combined))

/*
 * DATA IMPORT
 */

 //DISPATCH 
 const globalDispatch = d3.dispatch(
 	'change:artist', 
 	'change:year', 
 	'change:track'); //broadcasting "artist info" to the modules

 // colorControls(
	//  	d3.select('.color-control').node(),
	//  	['red','blue','by value'],
	//  	globalDispatch
 // 	);

//cluster viz 

globalDispatch.on('change:year', (year)=>{

 	currentYear = year;

 	dataCombined.then(data=>{
 		const yearFiltered = data.filter(d=>d.year === year);  

 		console.log(yearFiltered);
 	})
 })

// dataCombined.then(year=>yearTitle(groupByYear(year)));
dataCombined.then(year=>renderRanking(groupByYear(year)));

//artist bubble
globalDispatch.on('change:artist', (artist, id)=>{

 	originArtist = artist;

 	console.log(dataCombined); //data is here

 	dataCombined.then(data=>{
 		const artistFiltered = data.filter(d=>d.artist_data === artist); 
 		console.log(artistFiltered);
 	})
 })

//broadcast data 
dataCombined.then(() => 
	globalDispatch.call(
		'change:artist', null, 'Zedd', '2qxJFvFYMEDqd7ui6kSAcq'
		)
	);

dataCombined.then(artist=>renderMenu_feature(groupByArtist(artist)));
dataCombined.then(artist=>renderBubbles(groupByArtist(artist)));
dataCombined.then(artist=>renderMean(groupByArtist(artist)));



globalDispatch.on('change:track', (track)=>{

	currentTrack = track;

 	dataCombined.then(track=>{renderDanceability(track)})
 	dataCombined.then(track=>{renderEnergy(track)})
 	dataCombined.then(track=>{renderSpeechiness(track)})
 	dataCombined.then(track=>{renderLiveness(track)})
 	dataCombined.then(track=>{renderValence(track)})
 	dataCombined.then(track=>{renderAcousticness(track)})

 })
dataCombined.then(() => 
	globalDispatch.call(
		'change:track', null, '6DCZcSspjsKoFjzjrWoCdn'
		)
	);


//UI for modules

function renderRanking(data){

	const charts = d3.select('.ranking-container')
		.selectAll('.chart')
		.data(data);

	const chartsEnter = charts.enter()
		.append('div')
		.attr('class','chart')

	charts.exit().remove()

	charts.merge(chartsEnter)
		.each(function(d){
			cluster(
				d.values,
				this
				)
		})
	globalDispatch.on('change:year',null, 2018);

}

function renderMean(data){

	d3.select('.tooltip-container')
		.each(function(){
			drawTooltip(this,data);
		})
}

function renderBubbles(data){
	const bubbles = artistBubbles();

	d3.select('.artistBubble-container')
		.each(function(){
			bubbles(this, data);
		});

	globalDispatch.on('change:color', colorOption => {
		bubbles.updateColor(colorOption);
	});
}

function renderDanceability(data){
	d3.selectAll('#danceability')
		.on('click', function(){danceability(this, data)});
}

function renderEnergy(data){
	d3.selectAll('#energy').on('click', function(){
			energy(this, data);
		});
}

function renderValence(data){
	d3.selectAll('#valence').on('click', function(){
			valence(this, data);
		});
}

function renderSpeechiness(data){
	d3.selectAll('#speechiness').on('click', function(){
			speechiness(this, data);
		});
}

function renderAcousticness(data){
	d3.selectAll('#acousticness').on('click', function(){
			acousticness(this, data);
		});
}

function renderLiveness(data){
	d3.selectAll('#liveness').on('click', function(){
			liveness(this, data);
		});
}


function renderMenu_feature(artist){
//Get list of countryCode values
	const artistList = Array.from(artist.entries());
	console.log(artistList)
	//Build UI for <select> menu
	let menu = d3.select('#featureArtist')
		.selectAll('select')
		.data([1]);
	menu = menu.enter()
		.append('select')
		.attr('class','form-control form-control-sm')
		.merge(menu);
	//Add <option> tag under <select>
	menu.selectAll('option')
		.data(artistList)
		.enter()
		.append('option')
		.attr('value', d => d[1])
		.html(d => d[1].artist);

	//Define behavior for <select> menu
	menu.on('change', function(){
		const artist = this.value;
		const display = this.options[1].innerHTML;

		globalDispatch.on('change:artist',null,artist);
	});
}

