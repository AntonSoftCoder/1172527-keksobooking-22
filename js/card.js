import { APARTMENT_TYPES, ROOM_VARIANTS, GUEST_VARIANTS, FACILITIES } from './constants.js';
import { pluralize } from './utils.js';

const CARD_POPUP = document.querySelector('#card')
  .content
  .querySelector('.popup');

const MAP_CANVAS = document.querySelector('.map__canvas');


const getRoomCapacity = (rooms, guests) => {
  return `${rooms} ${pluralize(rooms, ROOM_VARIANTS)} для ${guests} ${pluralize(guests, GUEST_VARIANTS)}`;
};

const createFeatures = (card, features) => {
  const featuresContainerNode = card.querySelector('.popup__features');
  if (features && features.length > 0) {
    FACILITIES.forEach((feature) => {
      const featureNode = card.querySelector(`.popup__feature--${feature}`);
      if (features.includes(feature)) {
        featureNode.textContent = feature;
      } else {
        featureNode.remove();
      }
    })
  } else {
    featuresContainerNode.remove();
  }
};

const createPictures = (card, urls) => {
  const photosContainerNode = card.querySelector('.popup__photos');
  const photoNode = photosContainerNode.querySelector('.popup__photo');
  if (urls && urls.length > 0) {
    photosContainerNode.textContent = '';
    urls.forEach((url) => {
      const photo = photoNode.cloneNode(true);
      photo.src = url;
      photosContainerNode.appendChild(photo);
    });
  } else {
    photosContainerNode.remove();
  }
};

const createCard = (advert) => {

  const cardListFragment = document.createDocumentFragment();

  const {author, offer} = advert;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;
  const card = CARD_POPUP.cloneNode(true);

  const avatarNode = card.querySelector('.popup__avatar');
  if (author && author.avatar) {
    avatarNode.src = author.avatar;
  } else {
    avatarNode.remove();
  }

  const titleNode = card.querySelector('.popup__title');
  if (title) {
    titleNode.textContent = title;
  } else {
    titleNode.remove();
  }

  const addressNode = card.querySelector('.popup__text--address');
  if (address) {
    addressNode.textContent = address;
  } else {
    addressNode.remove();
  }

  const priceNode = card.querySelector('.popup__text--price');
  if (price) {
    priceNode.childNodes[0].nodeValue = `${price} `;
  } else {
    priceNode.remove();
  }

  const typeNode = card.querySelector('.popup__type');
  if (type) {
    typeNode.textContent = APARTMENT_TYPES[type];
  } else {
    typeNode.remove();
  }

  const capacityNode = card.querySelector('.popup__text--capacity');
  if (rooms && guests) {
    capacityNode.textContent = getRoomCapacity(rooms, guests);
  } else {
    capacityNode.remove();
  }

  const timeNode = card.querySelector('.popup__text--time');
  if (checkin && checkout) {
    timeNode.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    timeNode.remove();
  }

  createFeatures(card, features);

  const descriptionNode = card.querySelector('.popup__description');
  if (description) {
    descriptionNode.textContent = description;
  } else {
    descriptionNode.remove();
  }

  createPictures(card, photos);

  cardListFragment.appendChild(card);
  return cardListFragment;
};

export const renderCard = (advert) => {
  MAP_CANVAS.appendChild(createCard(advert));
}
