const pluralize = (count, variants) => {
  const restOfHundred = Math.abs(count % 100);
  const restOfTen = Math.abs(count % 10);

  if (restOfHundred > 10 && restOfHundred < 20)
    return variants[2];
  if (restOfTen > 1 && restOfTen < 5)
    return variants[1];
  if (restOfTen === 1)
    return variants[0];

  return variants[2];
};

const getLocationAsString = ({lat, lng}, locationPrecision) => {
  return `${lat.toFixed(locationPrecision)}, ${lng.toFixed(locationPrecision)}`;
}

const getPointAsLocation = ({x, y}) => {
  return {
    lat: x,
    lng: y,
  };
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

export { pluralize, getLocationAsString, getPointAsLocation, isEscEvent };
