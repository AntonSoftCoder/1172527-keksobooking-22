import {getRandomNumber, getRandomCoordinate, getRandomArrayElement} from './utils.js';
import {CHECK_IN_OUT_HOURS, FACILITIES, apartmentTypes, LOCATION_PRECISION} from './constants.js'

const OBJECT_COUNT = 10;

const VALUE = {
  MIN: 1,
  MAX: 8,
}

const LAT = {
  MIN: 35.65000,
  MAX: 35.70000,
}

const LNG = {
  MIN: 139.70000,
  MAX: 139.80000,
}

const PICTURES = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const SENTENCES = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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

const getRandomAuthor = () => {
  const numberAsString = `${getRandomNumber(VALUE.MIN, VALUE.MAX)}`;

  return {
    avatar: `img/avatars/user${numberAsString.padStart(2, '0')}.png`,
  }
};

const getRandomLocation = () => ({
  x: getRandomCoordinate(LAT.MIN, LAT.MAX, LOCATION_PRECISION),
  y: getRandomCoordinate(LNG.MIN, LNG.MAX, LOCATION_PRECISION),
});

const getRandomPicture = () => {
  return `http://o0.github.io/assets/images/tokyo/hotel${getRandomNumber(VALUE.MIN, PICTURES.length)}.jpg`;
};

const getArrayOf = (n) => {
  return new Array(getRandomNumber(VALUE.MIN, n)).fill('');
}

const getUniqueValues = (values) => {
  return Array.from(new Set(values));
}

const createRandomOffer = (location) => {
  const randomHour = getRandomArrayElement(CHECK_IN_OUT_HOURS);
  return {
    title: getRandomArrayElement(SENTENCES),
    address: `${location.x}, ${location.y}`,
    price: getRandomNumber(VALUE.MIN * 100, VALUE.MAX * 100),
    type: getRandomArrayElement(Object.keys(apartmentTypes)),
    rooms: getRandomNumber(VALUE.MIN, VALUE.MAX),
    guests: getRandomNumber(VALUE.MIN, VALUE.MAX),
    checkin: randomHour,
    checkout: randomHour,
    features: getUniqueValues(getArrayOf(FACILITIES.length).map(() => getRandomArrayElement(FACILITIES))),
    description: getRandomArrayElement(SENTENCES),
    photos: getUniqueValues(getArrayOf(PICTURES.length).map(getRandomPicture)),
  }
}

export const getCards = () => {
  const mockArrayObjects = [];
  for (let i = 0; i < OBJECT_COUNT; i++) {
    const location = getRandomLocation();
    mockArrayObjects.push({
      author: getRandomAuthor(),
      offer: createRandomOffer(location),
      location,
    });
  }
  return mockArrayObjects;
}
