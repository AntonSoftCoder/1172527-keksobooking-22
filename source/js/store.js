const MAX_MARKER_COUNT = 10;

let initialData = null;
let preparedData = null;

const storeData = (data) => {
  initialData = data;
  preparedData = initialData.slice(0, MAX_MARKER_COUNT);
}

const getData = () => preparedData;

const prepareData = (filterData) => {
  preparedData = initialData
    .filter(filterData)
    .slice(0, MAX_MARKER_COUNT);
};

export { getData, prepareData, storeData };
