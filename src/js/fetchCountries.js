const BASE_URL = 'https://restcountries.com/v3.1/name/';
// ?fields=name,capital,population,flags.svg,languages
// const query = '';

export default function fetchCountries(query) {
  const options = {
    // simple: true,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(
    `${BASE_URL}${query}?fields=name,capital,population,flags,languages`,
    options
  )
    .then(response => {
      if (!response.ok) {
        // console.log(response);
        throw new Error('Oops, there is no country with that name');
      }
      return response.json();
    })
    .then(data => {
      // console.log(data.length);
      if (data.length > 10) {
        throw new Error(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      return transformData(data);
    });
}

function transformData(data) {
  const countries = data.map(element => {
    console.log(Object.values(element.languages));
    const country = {};
    ({
      name: { official: country.name },
      capital: country.capital,
      flags: { svg: country.flag },
      population: country.population,
      languages: country.languages,
    } = element);
    return country;
  });
  // console.log(countries);
  return countries;
}
