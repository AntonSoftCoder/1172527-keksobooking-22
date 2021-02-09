const MAX_FLOAT_PRECISION = Math.pow(10, 17);

function getRandomNumber(from, to) {
  const fromInt = Number(from);
  const toInt = Number(to);
  if (fromInt < 0 || toInt < 0 || fromInt > toInt || !Number.isInteger(fromInt) || !Number.isInteger(toInt)) {
    throw new Error(`from = ${from}, to = ${to} must make a positive integer range`);
  }

  if (fromInt === toInt) {
    return fromInt;
  }

  return fromInt + Math.floor(Math.random()*(toInt - fromInt + 1));
}

function getRandomCoordinate(from, to, floatPoints) {
  if (from < 0 || to < 0 || from > to || isNaN(from) || isNaN(to)) {
    throw new Error(`from = ${from}, to = ${to} must make a positive range`);
  }

  if (floatPoints < 0 || !Number.isInteger(floatPoints)) {
    throw new Error(`floatPoints = ${floatPoints} must be a non-negative integer`);
  }

  const fromInt = from * MAX_FLOAT_PRECISION;
  const toInt = to * MAX_FLOAT_PRECISION;
  const result = getRandomNumber(fromInt, toInt) / MAX_FLOAT_PRECISION;

  return Number(result.toFixed(floatPoints));
}

getRandomCoordinate(48.13037236984187, 49.132707733425015, 5);
getRandomCoordinate('50.13037236984187', '50.13037236984187', 4);

