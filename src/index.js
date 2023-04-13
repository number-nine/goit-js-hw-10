import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './js/fetchCountries';
// import pug from 'pug';

import countryCard from './pug-templates/country-card.pug';
import countryList from './pug-templates/country-list.pug';

import 'notiflix/dist/notiflix-3.2.6.min.css';


console.dir(countryCard);

const DEBOUNCE_DELAY = 300;

const searchEl = document.querySelector('#search-box');

searchEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// const countryList = pug.renderFile('./pug-templates/country-list.pug');
// console.log("🚀 ~ file: index.js:22 ~ countryList:", countryList)


// document.querySelector('.country-info').innerHTML = countryCard;
// document.querySelector('.country-list').innerHTML = countryList();

function onInput(e) {
  e.preventDefault();
  const query = purifyQuery(e.target.value);

  if (query === '') {
    Notify.failure("Search field can't be empty");
    return;
  }

  fetchCountries(query)
    .then(countries => {
      console.log('countries:', countries);
      // if (countries.length > 10) {
      //   Notify.failure(
      //     'Too many matches found. Please enter a more specific name.'
      //   );
      // } else 
      if (countries.length === 1) {
        console.log('one country');
        console.log(countries[0]);
        document.querySelector('.country-info').innerHTML = countryCard(countries[0]);

        // console.log(country);
      } else {
        console.log('countries collection');
        // document.querySelector('.country-list').innerHTML =
        //   countryList(countries);
      }
    })
    .catch(alert => {
      // console.dir(alert);
      Notify.failure(alert.message);
    });
}

function purifyQuery(queryString) {
  return queryString.trim();
  if (queryString === '') {
  }
}
