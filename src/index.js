console.log('index.js!');

import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
// import {message} from './module1';
import * as d3 from 'd3';

//DATASET IMPORT 
import {
	trackPromise,
	artistPromise,
	dataCombined
} from './data';

import {
	parseTrack,
	parseArtist,
	groupByYear,
	artistApp
} from './utl';

//VIEW MODULES 
import trackRanking from './viewModules/ranking';
import artistBubbles from './viewModules/artistBubbles';
import audioFeature from './viewModules/feature';


/*
 * DATA IMPORT
 */
 //DATA PROMISE IMPORT
 // trackPromise.then(track => renderMenu(track));

//UI for modules
function renderMenu(year){

	//Build UI for <select> menu
	let menu = select('.nav')
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
		.attr('value', d => d[1])
		.html(d => d[0]);

	//Define behavior for <select> menu
	menu.on("change", function(){
	    const year = this.value;
	    const data = transform(year,yearData); 

	 });
}

function renderBubbles(data, year){
	// const bubbles = artistBubbles();

	select('.artistBubble-container')
		.each(function(){
			artistBubbles(this, data);
		});
}

function renderFeature(data){
	select('.feature-container')
		.each(function(){
			audioFeature(this, data);
		});
}


