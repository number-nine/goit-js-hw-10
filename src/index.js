import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries'

const DEBOUNCE_DELAY = 300;

const searchEl = document.querySelector('#search-box');

searchEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));



function onInput(e) {
   
    e.preventDefault();
    const query = purifyQuery(e.target.value);

    console.log(query);

  fetchCountries(query).then((data) => { 
    console.log('data:', data);
    if (data.length > 10) {
      console.log('Too many matches found. Please enter a more specific name.');
    } else if (data.length === 1) {
      console.log('one country');
    } else {
      console.log('countries collection');
    }
  });
      
      

}

function purifyQuery(queryString) {
  return queryString.trim();
  if (queryString === '') {

  }
}



