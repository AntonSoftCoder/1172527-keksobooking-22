import { toggleElements } from './utils.js';

const MAP_FILTERS_CONTAINER = document.querySelector('.map__filters');

const FILTER_DELAY = 500;

const FilterType = {
  HOUSING_TYPE: 'type',
  HOUSING_PRICE_RANGE: 'price',
  FEATURES: 'features',
  HOUSING_ROOMS: 'rooms',
  HOUSING_GUESTS: 'guests',
}

const housingPriceRange = {
  low: { from: 0, to: 10000 },
  middle: { from: 10000, to: 50000 },
  high: { from: 50000, to: null },
}

const FilterNode = {
  [FilterType.HOUSING_TYPE]: MAP_FILTERS_CONTAINER.querySelector('#housing-type'),
  [FilterType.HOUSING_PRICE_RANGE]: MAP_FILTERS_CONTAINER.querySelector('#housing-price'),
  [FilterType.HOUSING_ROOMS]: MAP_FILTERS_CONTAINER.querySelector('#housing-rooms'),
  [FilterType.HOUSING_GUESTS]: MAP_FILTERS_CONTAINER.querySelector('#housing-guests'),
  [FilterType.FEATURES]: MAP_FILTERS_CONTAINER.querySelector('#housing-features'),
}

const currentFilters = {};

const toggleFilters = (isShown) => () => {
  toggleElements(MAP_FILTERS_CONTAINER, Object.values(FilterNode), isShown);
}

const saveFilter = (type, value) => {
  if (type === FilterType.FEATURES) {
    currentFilters[type] = _.xor(currentFilters[type], [value]);
  } else {
    currentFilters[type] = value;
  }
}

const isEmptyFilter = (type) => {
  const value = currentFilters[type];
  return _.isNil(value)
    || value === 'any'
    || (type === FilterType.FEATURES && _.isEmpty(value));
}

const isItemMatched = (item) =>
  Object.values(FilterType).every(filterType => {
    if (!isEmptyFilter(filterType)) {
      switch (filterType) {
        case FilterType.FEATURES:
          if (!_.isEmpty(_.difference(currentFilters[filterType], item.offer.features))) {
          // if (_.intersection(currentFilters[filterType], item.offer.features).length !== currentFilters[filterType].length) {
            return false;
          }
          break;
        case FilterType.HOUSING_PRICE_RANGE: {
          const { from, to } = housingPriceRange[currentFilters[filterType]];
          if (item.offer.price < from || (to && item.offer.price > to)) {
            return false;
          }
          break;
        }
        case FilterType.HOUSING_ROOMS:
        case FilterType.HOUSING_GUESTS:
          if (item.offer[filterType] !== Number(currentFilters[filterType])) {
            return false;
          }
          break;
        default:
          if (item.offer[filterType] !== currentFilters[filterType]) {
            return false;
          }
      }
    }
    return true;
  });

const addEventsFilterHandler = (filterData) => {

  Object.entries(FilterNode).forEach(([filterType, node]) => {
    node.addEventListener('change', evt => {
      saveFilter(filterType, evt.target.value);
      filterData();
    });
  });
}

export { toggleFilters, addEventsFilterHandler, isItemMatched, FILTER_DELAY };
