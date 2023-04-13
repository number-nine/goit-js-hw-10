import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './js/fetchCountries';

import 'notiflix/dist/notiflix-3.2.6.min.css';

import countryInfo from './pug-templates/country-info.pug';
import countryList from './pug-templates/country-list.pug';

const DEBOUNCE_DELAY = 300;

const searchEl = document.querySelector('#search-box');
const countryInfoEl = document.querySelector('.country-info');
const countryListEl = document.querySelector('.country-list');

searchEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  e.preventDefault();
  clearOutput();
  const query = purifyQuery(e.target.value);

  if (query === '') {
    Notify.failure("Search field can't be empty");
    return;
  }

  fetchCountries(query)
    .then(countries => {
      if (countries.length === 1) {
        countryInfoEl.innerHTML = countryInfo(countries[0]);
      } else {
        countryListEl.innerHTML = countryList(countries);
      }
    })
    .catch(alert => {
      Notify.failure(alert.message);
    });
}

function purifyQuery(queryString) {
  return queryString.trim();
}

function clearOutput() {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
}
