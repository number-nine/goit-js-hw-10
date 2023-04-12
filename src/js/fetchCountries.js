const BASE_URL = 'https://restcountries.com/v3.1/name/';
// const query = '';

export default function fetchCountries(query) {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(
    `${BASE_URL}${query}?fields=name.official,capital,population,flags.svg,languages`,
    options
  ).then(response => response.json());
}
