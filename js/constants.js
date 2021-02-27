export const CHECK_IN_OUT_HOURS = [
  '12:00',
  '13:00',
  '14:00',
];

export const FACILITIES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

export const APARTMENT_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

export const ROOM_VARIANTS = [
  'комната',
  'комнаты',
  'комнат',
];

export const GUEST_VARIANTS = [
  'гостя',
  'гостей',
  'гостей',
];

export const pluralize = (count, variants) => {
  const restOfHundred = count % 100;
  const restOfTen = count % 10;

  if (restOfHundred > 10 && restOfHundred < 20)
    return variants[2];
  if (restOfTen > 1 && restOfTen < 5)
    return variants[1];
  if (restOfTen === 1)
    return variants[0];

  return variants[2];
};


