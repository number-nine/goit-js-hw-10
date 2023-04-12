import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries'

const DEBOUNCE_DELAY = 300;

const searchEl = document.querySelector('#search-box');

searchEl.addEventListener('input', onInput);



function onInput(e) {
    e.preventDefault();
    const query = e.currentTarget.value;

    console.log(query);

    fetchCountries(query)
      .then(data => {
        console.log('this is then');
        console.log(data);
      })
      .catch(({ message }) => {
        // console.log('this is catch');
        // console.log({ message });
      });

}



