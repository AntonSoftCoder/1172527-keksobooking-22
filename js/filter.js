import { filterBy, FilterType } from './store.js';
import { toggleElements } from './utils.js';

const MAP_FILTERS_CONTAINER = document.querySelector('.map__filters');

const FilterNode = {
  TYPE: MAP_FILTERS_CONTAINER.querySelector('#housing-type'),
  PRICE: MAP_FILTERS_CONTAINER.querySelector('#housing-price'),
  ROOM: MAP_FILTERS_CONTAINER.querySelector('#housing-rooms'),
  GUESTS: MAP_FILTERS_CONTAINER.querySelector('#housing-guests'),
  FEATURES: MAP_FILTERS_CONTAINER.querySelector('#housing-features'),
}

const toggleFilters = (isShown) => () => {
  // setTimeout(() => {
  toggleElements(MAP_FILTERS_CONTAINER, Object.values(FilterNode), isShown);
  // }, isShown ? 3000 : 0);
}

const addEventsFilterHandler = (filterPopupMarkers) => {
  FilterNode.TYPE.addEventListener('change', evt => {
    filterBy(FilterType.HOUSING_TYPE, evt.target.value);
    filterPopupMarkers();
  });
}

export { toggleFilters, addEventsFilterHandler };
