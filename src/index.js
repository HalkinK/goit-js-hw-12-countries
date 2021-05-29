import './sass/main.scss';

import countryTpl from './templates/country.hbs';
import countriesTpl from './templates/countries.hbs';
import debounce from 'lodash.debounce';
import API from './fetchCountries';
import { error, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});

const refs = {
  countryContainer: document.querySelector('.js-country-container'),
  input: document.querySelector('.js-input'),
};

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  const search = e.target.value;
  if (search !== '') {
    API.fetchCountries(search)
      .then(renderCountryMarkup)
      .catch(error => console.log('error'));
  }
}

function renderCountryMarkup(country) {
  if (country.length === 1) {
    const markup = countryTpl(country);
    refs.countryContainer.innerHTML = markup;
  } else if (country.length >= 2 && country.length <= 10) {
    const markup = countriesTpl(country);
    refs.countryContainer.innerHTML = markup;
  } else if (country.length > 10) {
    error({
      text: 'Слишком много совпадений. Сделайте запрос более специфичным',
    });
  }
}
