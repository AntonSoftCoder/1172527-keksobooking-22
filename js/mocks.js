import {getRandomNumber, getRandomCoordinate, getRandomArrayElement} from './utils.js';
import {CHECK_IN_OUT_HOURS, FACILITIES, APARTMENT_TYPES} from './constants.js'
const OBJECT_COUNT = 10;

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
  return {
    avatar: `img/avatars/user0${getRandomNumber(1, 8)}.png`,
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

const getArrayOf = (n) => {
  return new Array(getRandomNumber(1, n)).fill('');
}

const getUniqueValues = (values) => {
  return Array.from(new Set(values));
}

const createRandomOffer = () => {
  const randomHour = getRandomArrayElement(CHECK_IN_OUT_HOURS);
  return {
    title: getRandomArrayElement(SENTENCES),
    address: `${getRandomLocation().x}, ${getRandomLocation().y}`,
    price: getRandomNumber(70, 500),
    type: getRandomArrayElement(Object.keys(APARTMENT_TYPES)),
    rooms: getRandomNumber(1, 4),
    guests: getRandomNumber(1, 8),
    checkin: randomHour,
    checkout: randomHour,
    features: getUniqueValues(getArrayOf(FACILITIES.length).map(() => getRandomArrayElement(FACILITIES))),
    description: getRandomArrayElement(SENTENCES),
    photos: getUniqueValues(getArrayOf(PICTURES.length).map(getRandomPicture)),
  }
}

export const getAdvertisements = () => {
  const mockArrayObjects = [];
  for (let i = 0; i < OBJECT_COUNT; i++) {
    mockArrayObjects.push({
      author: getRandomAuthor(),
      offer: createRandomOffer(),
      location: getRandomLocation(),
    });
  }
  return mockArrayObjects;
}


