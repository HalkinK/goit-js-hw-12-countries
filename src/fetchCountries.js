function fetchCountries(search) {
  return fetch(`https://restcountries.eu/rest/v2/name/${search}`).then(responce => {
    return responce.json();
  });
}

export default { fetchCountries };
