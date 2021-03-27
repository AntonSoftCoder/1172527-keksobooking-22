import { pluralize } from './utils.js';

const apartmentTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const FACILITIES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const ROOM_VARIANTS = [
  'комната',
  'комнаты',
  'комнат',
];

const GUEST_VARIANTS = [
  'гостя',
  'гостей',
  'гостей',
];

const CARD_POPUP_NODE = document.querySelector('#card').content.querySelector('.popup');

const getRoomCapacity = (rooms, guests) => {
  return rooms && guests &&
    `${rooms} ${pluralize(rooms, ROOM_VARIANTS)} для ${guests} ${pluralize(guests, GUEST_VARIANTS)}`;
};

const getTimeInfo = (checkin, checkout) => {
  return checkin && checkout &&
    `Заезд после ${checkin}, выезд до ${checkout}`;
}

const setOrRemoveFeatures = (card, features) => {
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

const setOrRemovePictures = (card, urls) => {
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

const setOrRemoveCardField = (node, content) => {
  if (content) {
    node.textContent = content;
  } else {
    node.remove();
  }
}

const createCard = (advert) => {

  const { author, offer } = advert;
  const { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos } = offer;

  const card = CARD_POPUP_NODE.cloneNode(true);

  const titleNode = card.querySelector('.popup__title');
  const addressNode =  card.querySelector('.popup__text--address');
  const priceNode = card.querySelector('.popup__text--price');
  const typeNode = card.querySelector('.popup__type');
  const capacityNode = card.querySelector('.popup__text--capacity');
  const timeNode = card.querySelector('.popup__text--time');
  const descriptionNode = card.querySelector('.popup__description');
  const avatarNode = card.querySelector('.popup__avatar');

  if (author && author.avatar) {
    avatarNode.src = author.avatar;
  } else {
    avatarNode.remove();
  }

  setOrRemoveCardField(titleNode, title);

  setOrRemoveCardField(addressNode, address);

  setOrRemoveCardField(priceNode.childNodes[0], `${price}`);

  setOrRemoveCardField(typeNode, apartmentTypes[type]);

  setOrRemoveCardField(capacityNode, getRoomCapacity(rooms, guests));

  setOrRemoveCardField(timeNode, getTimeInfo(checkin, checkout));

  setOrRemoveFeatures(card, features);

  setOrRemoveCardField(descriptionNode, description);

  setOrRemovePictures(card, photos);

  return card;
};

export { createCard };
