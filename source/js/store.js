const MAX_MARKER_COUNT = 10;

let initialData = null;
let preparedData = null;

const storeData = (data) => {
  initialData = data;
  preparedData = initialData.slice(0, MAX_MARKER_COUNT);
}

const getData = () => preparedData;

const prepareData = (filterData) => {
  preparedData = initialData.filter(filterData);
  if (preparedData.length > MAX_MARKER_COUNT) {
    preparedData = preparedData.slice(0, MAX_MARKER_COUNT);
  }
};

export { getData, prepareData, storeData };
