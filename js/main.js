const MAX_FLOAT_PRECISION = 17;

getRandomCoordinate(48.13037236984187, 49.132707733425015, 5);

function getRandomCoordinate(from, to, floatPoints) {
  if (from < 0 || to < 0 || from >= to || typeof from !== 'number' || typeof to !== 'number') {
    throw new Error(`from = ${from}, to = ${to} must make a positive range`);
  }

  if (floatPoints < 0 || !Number.isInteger(floatPoints)) {
    throw new Error(`floatPoints = ${floatPoints} must be a non-negative integer`);
  }
  const fromInt = parseInt(from * Math.pow(10, MAX_FLOAT_PRECISION));
  const toInt = parseInt(to * Math.pow(10, MAX_FLOAT_PRECISION));
  const result = getRandomNumber(fromInt, toInt) / Math.pow(10, MAX_FLOAT_PRECISION);

  return Number(result.toFixed(floatPoints));
}

function getRandomNumber(from, to) {
  if (from < 0 || to < 0 || from >= to || !Number.isInteger(from) || !Number.isInteger(to)) {
    throw new Error(`from = ${from}, to = ${to} must make a positive integer range`);
  }

  return from + Number.parseInt(Math.random()*(to - from + 1));
}


