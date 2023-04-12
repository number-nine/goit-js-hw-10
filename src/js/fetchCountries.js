const BASE_URL = 'https://restcountries.com/v3.1/name/';
// ?fields=name,capital,population,flags.svg,languages
// const query = '';

export default function fetchCountries(query) {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(
    `${BASE_URL}${query}?fields=name,capital,population,flags,languages`,
    options
  ).then(response => response.json())
    .then(data => {
    console.log('data:', ...data);
        return data;
      })
        
}
    
