import { apartmentTypes, ROOM_VARIANTS, GUEST_VARIANTS, FACILITIES } from './constants.js';
import { pluralize } from './utils.js';

const CARD_POPUP_NODE = document.querySelector('#card')
  .content
  .querySelector('.popup');

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

const createCardField = (node, content) => {
  if (content) {
    node.textContent = content;
  } else {
    node.remove();
  }
}

export const createCard = (advert) => {

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

  createCardField(titleNode, title);

  createCardField(addressNode, address);

  if (price) {
    priceNode.childNodes[0].nodeValue = `${price} `;
  } else {
    priceNode.remove();
  }

  createCardField(typeNode, apartmentTypes[type]);

  if (rooms && guests) {
    capacityNode.textContent = getRoomCapacity(rooms, guests);
  } else {
    capacityNode.remove();
  }

  if (checkin && checkout) {
    timeNode.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    timeNode.remove();
  }

  createFeatures(card, features);

  createCardField(descriptionNode, description);

  createPictures(card, photos);

  return card;
};
