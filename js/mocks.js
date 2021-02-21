import {getRandomNumber, getRandomCoordinate} from './utils.js';

const HOUSING_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FACILITIES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PICTURES = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Integer nec odio.
Praesent libero.
Sed cursus ante dapibus diam.
Sed nisi.
Nulla quis sem at nibh elementum imperdiet.
Duis sagittis ipsum. Praesent mauris.
Fusce nec tellus sed augue semper porta.
Mauris massa.
Vestibulum lacinia arcu eget nulla.
Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
Curabitur sodales ligula in libero.
Sed dignissim lacinia nunc.
Curabitur tortor.
Pellentesque nibh.
Aenean quam.
In scelerisque sem at dolor.
Maecenas mattis.
Sed convallis tristique sem.
Proin ut ligula vel nunc egestas porttitor.
Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.
Fusce ac turpis quis ligula lacinia aliquet.
Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.
Quisque volutpat condimentum velit.
Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
Nam nec ante.`.split('.').filter(Boolean);

const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const getRandomAuthor = () => {
  return {
    avatar: `../img/avatars/user0${getRandomNumber(1, 8)}`,
  }
};

const getRandomLocation = () => {
  return {
    x: getRandomCoordinate(35.65000, 35.70000, 5),
    y: getRandomCoordinate(139.70000, 139.80000, 5),
  }
};

const getRandomPicture = () => {
  return `http://o0.github.io/assets/images/tokyo/hotel${getRandomNumber(1, PICTURES.length)}.jpg`;
};

const arrayOf = (n) => {
  return new Array(getRandomNumber(1, n)).fill('');
}

const uniqueValues = (values) => {
  return Array.from(new Set(values));
}

const createRandomOffer = () => {
  return {
    title: getRandomArrayElement(TEXT),
    address: `${getRandomLocation().x}, ${getRandomLocation().y}`,
    price: getRandomNumber(70, 500),
    type: getRandomArrayElement(HOUSING_TYPE),
    rooms: getRandomNumber(1, 4),
    guests: getRandomNumber(1, 8),
    checkin: getRandomArrayElement(CHECKIN_TIME),
    checkout: getRandomArrayElement(CHECKOUT_TIME),
    features: uniqueValues(arrayOf(FACILITIES.length).map(() => getRandomArrayElement(FACILITIES))),
    description: getRandomArrayElement(TEXT),
    photos: uniqueValues(arrayOf(PICTURES.length).map(getRandomPicture)),
  }
};

try {
  Array.from({length: 10}, () => ({
    author: getRandomAuthor(),
    offer: createRandomOffer(),
    location: getRandomLocation(),
  }));
} catch (error) {
  throw new Error(error);
}
