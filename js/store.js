// import { isEmpty, intersection } from 'lodash';

let initialData = null;
let preparedData = null;

const FilterType = {
  HOUSING_TYPE: 'type',
  FEATURES: 'features',
}

const currentFilters = {};

const MAX_MARKER_COUNT = 10;

const storeData = (data) => {
  initialData = data;
  preparedData = initialData.slice(0, MAX_MARKER_COUNT);
}

const getData = () => preparedData;

const isItemMatched = (filterType, item) => {
  return filterType === FilterType.FEATURES
    ? !_.isEmpty(_.intersection(item.offer[filterType], currentFilters[filterType]))
    : item.offer[filterType] === currentFilters[filterType];
}

const filterBy = (type, value) => {
  currentFilters[type] = value;
  preparedData = initialData;

  Object.values(FilterType).forEach(filterType => {
    if (currentFilters[filterType] && currentFilters[filterType] !== 'any') {
      preparedData = preparedData.filter(item => isItemMatched(filterType, item))
    }
  });
  preparedData = preparedData.slice(0, MAX_MARKER_COUNT);
}

export { filterBy, getData, storeData, FilterType };
