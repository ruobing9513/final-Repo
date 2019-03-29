console.log('index.js!');

import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import {message} from './module1'
import {select} from 'd3';

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
	artistInfo
} from './utl';

//VIEW MODULES 
import ranking from './viewModules/ranking';


/*
 * DATA IMPORT
 */
 //DATA PROMISE IMPORT
 trackPromise.then(track => renderMenu(track));


function renderMenu(year){
	//Get list of countryCode values
	const yearList = Array.from(countryCode.entries());

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