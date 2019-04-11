
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
import trackRanking from './viewModules/ranking';
import artistBubbles from './viewModules/artistBubbles';
import audioFeature from './viewModules/feature';
import drawTooltip from './viewModules/featureMean';

let originArtist = "Zedd";
let currentYear = "2018";

//CHECK DATA CONSOLE

// trackPromise.then(track=>console.log(track))
// artistPromise.then(artist=>console.log(artist))
dataCombined.then(combined=>console.log(combined))

/*
 * DATA IMPORT
 */

 //DISPATCH 
 const globalDispatch = d3.dispatch('change:artist', 'change:year'); //broadcasting "artist info" to the modules

 globalDispatch.on('change:artist', (artist, displayName)=>{

 	originArtist = artist;

 	// console.log(dataCombined); //data is here

 	dataCombined.then(data=>{
 		const artistFiltered = data.filter(d=>d.artist_data === artist); //why repeated names? 

 		console.log(artistFiltered);

 		renderBubbles(groupByArtist(artistFiltered));
 		renderMean(groupByArtist(artistFiltered));
 		renderMenu_feature(groupByArtist(artistFiltered));
 	})
 })


dataCombined.then(() => 
	globalDispatch.call(
		'change:artist', null, 'Zedd'
		)
	);

dataCombined.then(artist=>renderMenu_feature(artist));


globalDispatch.on('change:year', (year, displayName)=>{

 	currentYear = year;

 	dataCombined.then(data=>{
 		const yearFiltered = data.filter(d=>d.year === year);  

 		console.log(yearFiltered);

 		renderRanking(yearFiltered);
 		renderMenu(groupByYear(yearFiltered));
 	})
 })
dataCombined.then(() => 
	globalDispatch.call(
		'change:year', null, '2018'
		)
	);

dataCombined.then(year=>renderMenu(year));

//UI for modules

function renderRanking(year,data){
	const rankingChart = trackRanking()
		.onChangeYear(
			year => globalDispatch.call('change:year', null, year)
			)
	const charts = d3.select('.ranking-container')
		.selectAll('.chart')
		.data(data, d=>d.key);

	const chartsEnter = charts.enter()
		.append('div')
		.attr('class','chart')
	charts.exit().remove()

	chart.merge(chartsEnter)
		.each(function(d){
			rankingChart(
				d.values,
				this,
				d.key
				)
		})

}

function renderMean(artist, data){

	d3.select('.tooltip-container')
		.each(function(){
			drawTooltip(this,data);
		})
}

function renderBubbles(artist, data){

	d3.select('.artistBubble-container')
		.each(function(){
			artistBubbles(this, data);
		});
}

function renderFeature(data){
	d3. select('.feature-container')
		.each(function(){
			audioFeature(this, data);
		});
}

function renderMenu(year){
	const yearList = Array.from(year.entries());

	// console.log(yearList);

	//Build UI for <select> menu
	let menu = d3.select('.nav')
		.selectAll('select')
		.data([1]);

	menu = menu.enter()
		.append('select')
		.attr('class','form-control form-control-sm')
		.merge(menu);
	//Add <option> tag under <select>
	menu.selectAll('option')
		.data(yearList)
		.enter()
		.append('option')
		.attr('value', d=>d.year)
		.html(d => d[1].year);

	//Define behavior for <select> menu
	menu.on("change", function(){
	    const year = this.value;
	    const data = transform(year,groupByYear); 
	    // const display = 

	 });
}

function renderMenu_feature(artist){
//Get list of countryCode values
	const artistList = Array.from(artist.entries());
	// console.log(artistList)
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
		.attr('value', d => d[1].code)
		.html(d => d[1].artist_data);

	//Define behavior for <select> menu
	menu.on('change', function(){
		const artist = this.value;
		const display = this.options[idx].innerHTML;


		globalDispatch.call('change:artist',null,artist);
	});
}

