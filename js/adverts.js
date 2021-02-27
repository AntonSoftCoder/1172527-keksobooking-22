// import {getAdvertisements} from './mocks.js';
import {APARTMENT_TYPES, ROOM_VARIANTS, GUEST_VARIANTS, FACILITIES} from './constants.js';
import {pluralize} from './utils.js';

const cardPopup = document.querySelector('#card')
  .content
  .querySelector('.popup');

const mapCanvas = document.querySelector('.map__canvas');

const createAdvert = (advert) => {

  const advertListFragment = document.createDocumentFragment();

  const {author, offer} = advert;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;
  const advertCard = cardPopup.cloneNode(true);

  const avatarNode = advertCard.querySelector('.popup__avatar');
  if (author && author.avatar) {
    avatarNode.src = author.avatar;
  } else {
    avatarNode.remove();
  }

  const titleNode = advertCard.querySelector('.popup__title');
  if (title) {
    titleNode.textContent = title;
  } else {
    titleNode.remove();
  }

  const addressNode = advertCard.querySelector('.popup__text--address');
  if (address) {
    addressNode.textContent = address;
  } else {
    addressNode.remove();
  }

  const priceNode = advertCard.querySelector('.popup__text--price');
  if (price) {
    priceNode.childNodes[0].nodeValue = `${price} `;
  } else {
    priceNode.remove();
  }

  const typeNode = advertCard.querySelector('.popup__type');
  if (type) {
    typeNode.textContent = APARTMENT_TYPES[type];
  } else {
    typeNode.remove();
  }

  const capacityNode = advertCard.querySelector('.popup__text--capacity');
  if (rooms && guests) {
    capacityNode.textContent = `${rooms} ${pluralize(rooms, ROOM_VARIANTS)} для ${guests} ${pluralize(guests, GUEST_VARIANTS)}`;
  } else {
    capacityNode.remove();
  }

  const timeNode = advertCard.querySelector('.popup__text--time');
  if (checkin && checkout) {
    timeNode.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    timeNode.remove();
  }

  createFeatures(advertCard, features);

  const descriptionNode = advertCard.querySelector('.popup__description');
  if (description) {
    descriptionNode.textContent = description;
  } else {
    descriptionNode.remove();
  }

  createPictures(advertCard, photos);

  advertListFragment.appendChild(advertCard);
  return advertListFragment;
};


const createFeatures = (advertCard, features) => {
  const featuresContainerNode = advertCard.querySelector('.popup__features');
  if (features && features.length > 0) {
    FACILITIES.forEach((feature) => {
      const featureNode = advertCard.querySelector(`.popup__feature--${feature}`);
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

const createPictures = (advertCard, photos) => {
  const photosContainerNode = advertCard.querySelector('.popup__photos');
  if (photos && photos.length > 0) {
    const [firstPhoto, ...restPhotos] = photos;
    const photoNode = advertCard.querySelector('.popup__photo');
    photoNode.src = firstPhoto;

    restPhotos.forEach((photo) => {
      const nextPhotoNode = photoNode.cloneNode(true);
      nextPhotoNode.src = photo;
      photosContainerNode.appendChild(nextPhotoNode);
    });
  } else {
    photosContainerNode.remove();
  }
};


export const renderAdvert = (advert) => {
  mapCanvas.appendChild(createAdvert(advert));
}
