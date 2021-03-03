import { getLocationAsString } from './utils.js';

const FORM_AD_CONTAINER = document.querySelector('.ad-form');
const FORM_AD_HEADER_NODE = FORM_AD_CONTAINER.querySelector('.ad-form-header');
const FORM_AD_NODES = FORM_AD_CONTAINER.querySelectorAll('.ad-form__element');
const MAP_FILTERS_CONTAINER = document.querySelector('.map__filters');
const MAP_FILTERS_NODES = MAP_FILTERS_CONTAINER.querySelectorAll('.map__filter');
const MAP_FILTERS_FEATURES_NODE = MAP_FILTERS_CONTAINER.querySelector('.map__features');
const ADDRESS_FORM_NODE = document.querySelector('#address');

export const loadMapHandler = (isShown) => {
  [FORM_AD_CONTAINER, MAP_FILTERS_CONTAINER].forEach(
    el => el.classList.toggle('ad-form--disabled', !isShown));

  [FORM_AD_HEADER_NODE, ...FORM_AD_NODES, MAP_FILTERS_FEATURES_NODE, ...MAP_FILTERS_NODES].forEach(
    el => el.disabled = !isShown );
}

export const movePinHandler = (evt) => {
  ADDRESS_FORM_NODE.value = getLocationAsString(evt.target.getLatLng());
}
