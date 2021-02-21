const MAX_FLOAT_PRECISION = Math.pow(10, 17);

export function getRandomNumber(from, to) {
  let fromInt = Number(from);
  let toInt = Number(to);
  if (fromInt < 0 || toInt < 0 || !Number.isInteger(fromInt) || !Number.isInteger(toInt)) {
    throw new Error(`from = ${from}, to = ${to} must be non-negative integer values`);
  }

  if (fromInt === toInt) {
    return fromInt;
  }

  if (fromInt > toInt) {
    [fromInt, toInt] = [toInt, fromInt];
  }

  return fromInt + Math.floor(Math.random()*(toInt - fromInt + 1));
}

export function getRandomCoordinate(from, to, floatPoints) {
  if (from < 0 || to < 0 || isNaN(from) || isNaN(to)) {
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
