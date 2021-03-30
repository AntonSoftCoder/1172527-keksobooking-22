import { getLocationAsString, toggleElements } from './utils.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const LOCATION_PRECISION = 5;

const MAX_HOUSING_PRICE = 1000000;

const minPriceByApart = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
}

const NOT_FOR_GUESTS = {
  ROOM_COUNT: 100,
  GUEST_COUNT: 0,
}

const TITLE_LENGTH = {
  MIN: 30,
  MAX: 100,
}

const FORM_CONTAINER_NODE = document.querySelector('.ad-form');

const FormNode = {
  HEADER: FORM_CONTAINER_NODE.querySelector('.ad-form-header'),
  AVATAR: FORM_CONTAINER_NODE.querySelector('.ad-form__field input[type=file]'),
  AVATAR_PREVIEW: FORM_CONTAINER_NODE.querySelector('.ad-form-header__preview img'),
  PHOTO: FORM_CONTAINER_NODE.querySelector('.ad-form__upload input[type=file]'),
  PHOTO_PREVIEW_CONTAINER: FORM_CONTAINER_NODE.querySelector('.ad-form__photo'),
  ADDRESS: FORM_CONTAINER_NODE.querySelector('#address'),
  TYPE: FORM_CONTAINER_NODE.querySelector('#type'),
  PRICE: FORM_CONTAINER_NODE.querySelector('#price'),
  CHECKIN: FORM_CONTAINER_NODE.querySelector('#timein'),
  CHECKOUT: FORM_CONTAINER_NODE.querySelector('#timeout'),
  TITLE: FORM_CONTAINER_NODE.querySelector('#title'),
  ROOM: FORM_CONTAINER_NODE.querySelector('#room_number'),
  GUESTS: FORM_CONTAINER_NODE.querySelector('#capacity'),
  RESET_BUTTON: FORM_CONTAINER_NODE.querySelector('.ad-form__reset'),
}

const FORM_FEATURE_NODES = FORM_CONTAINER_NODE.querySelectorAll('input[name=features]');
const FORM_GUEST_OPTIONS = FormNode.GUESTS.querySelectorAll('option');
const IMAGE_NODE = document.querySelector('#form-photo-image').content.querySelector('img');

const setAddress = (location) => {
  FormNode.ADDRESS.value = getLocationAsString(location, LOCATION_PRECISION);
}

const changeCheckOutHandler = (evt) => {
  FormNode.CHECKOUT.value = evt.target.value;
}

const changeCheckInHandler = (evt) => {
  FormNode.CHECKIN.value = evt.target.value;
}

const changeMinPriceHandler = () => {
  const value = FormNode.TYPE.value;
  FormNode.PRICE.min = minPriceByApart[value];
  FormNode.PRICE.placeholder = minPriceByApart[value];
}

const validateTitleHandler = (evt) => {
  const node = evt.target;
  const valueLength = node.value.length;
  if (valueLength < TITLE_LENGTH.MIN) {
    node.setCustomValidity(`Введенный текст должен состоять минимум из ${TITLE_LENGTH.MIN} символов. Нужно ещё ${(TITLE_LENGTH.MIN - valueLength)} симв.`);
  } else if (valueLength > TITLE_LENGTH.MAX) {
    node.setCustomValidity(`Введенный текст должен состоять максимум из ${TITLE_LENGTH.MAX} символов. Удалите лишние ${(TITLE_LENGTH.MAX - valueLength)} симв.`);
  } else {
    node.setCustomValidity('');
  }
  node.reportValidity();
}

const validatePriceHandler = () => {

  const value = FormNode.PRICE.value;
  const housingType = FormNode.TYPE.value;
  if ( value < 0 || value < minPriceByApart[housingType]) {
    FormNode.PRICE.setCustomValidity(`Минимальная цена для этого типа жилья: ${minPriceByApart[housingType]}. Введите цену в диапазоне ${minPriceByApart[housingType]} - ${MAX_HOUSING_PRICE} руб.`);
  } else if (value > MAX_HOUSING_PRICE) {
    FormNode.PRICE.setCustomValidity(`Максимальная возможная цена за жильё ${MAX_HOUSING_PRICE} руб. Введите цену в диапазоне ${minPriceByApart[housingType]} - ${MAX_HOUSING_PRICE} руб.`);
  } else {
    FormNode.PRICE.setCustomValidity('');
  }
  FormNode.PRICE.reportValidity();
};

const adjustRoomGuestsHandler = () => {

  const roomCount = Number(FormNode.ROOM.value);
  const selectedGuestCount = Number(FormNode.GUESTS.value);

  FORM_GUEST_OPTIONS.forEach((guestOption) => {
    const guestCount = Number(guestOption.value);
    if (roomCount === NOT_FOR_GUESTS.ROOM_COUNT) {
      guestOption.disabled = guestCount !== NOT_FOR_GUESTS.GUEST_COUNT;
    } else {
      guestOption.disabled = guestCount === NOT_FOR_GUESTS.GUEST_COUNT || guestCount > roomCount;
    }
    if (guestCount === selectedGuestCount) {
      if (guestOption.disabled) {
        FormNode.GUESTS.setCustomValidity('Эта опция недоступна для выбранного варианта комнаты.');
        FormNode.GUESTS.reportValidity();
      } else {
        FormNode.GUESTS.setCustomValidity('');
      }
    }
  });
}

const clearValidationHandler = (evt) => {
  evt.target.setCustomValidity('');
}

const showImagePreviewHandler = (imageNode) => (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    const loadImageHandler = () => {
      imageNode.src = reader.result;
      reader.removeEventListener('load', loadImageHandler);
    }
    reader.addEventListener('load', loadImageHandler);

    reader.readAsDataURL(file);
  }
}

const removeImagePreview = () => {
  FormNode.PHOTO_PREVIEW_CONTAINER.textContent = '';
  FormNode.AVATAR_PREVIEW.src = 'img/muffin-grey.svg';
}

const showAvatarPreviewHandler = (evt) => {
  showImagePreviewHandler(FormNode.AVATAR_PREVIEW)(evt);
}

const createImageNodeHandler = (evt) => {
  const imagePhotoNode = IMAGE_NODE.cloneNode(true);
  showImagePreviewHandler(imagePhotoNode)(evt);
  FormNode.PHOTO_PREVIEW_CONTAINER.replaceChildren(imagePhotoNode);
}

const toggleForm = (isShown, resetForms, sendData) => {
  toggleElements(FORM_CONTAINER_NODE, Object.values(FormNode), isShown);
  toggleElements(FORM_CONTAINER_NODE, FORM_FEATURE_NODES, isShown);

  const submitFormHandler = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(formData);
  }

  if (isShown) {
    FormNode.AVATAR.addEventListener('change', showAvatarPreviewHandler);
    FormNode.PHOTO.addEventListener('change', createImageNodeHandler);
    FormNode.CHECKIN.addEventListener('change', changeCheckOutHandler);
    FormNode.CHECKOUT.addEventListener('change', changeCheckInHandler);
    FormNode.TYPE.addEventListener('change', changeMinPriceHandler);
    FormNode.TITLE.addEventListener('input', validateTitleHandler);
    FormNode.TYPE.addEventListener('change', validatePriceHandler);
    FormNode.PRICE.addEventListener('input', validatePriceHandler);
    FormNode.ROOM.addEventListener('change', adjustRoomGuestsHandler);
    FormNode.GUESTS.addEventListener('change', clearValidationHandler);
    FormNode.RESET_BUTTON.addEventListener('click', resetForms);
    FORM_CONTAINER_NODE.addEventListener('submit', submitFormHandler);
    adjustRoomGuestsHandler();
  } else {
    FormNode.AVATAR.removeEventListener('change', showAvatarPreviewHandler);
    FormNode.PHOTO.removeEventListener('change', createImageNodeHandler);
    FormNode.CHECKIN.removeEventListener('change', changeCheckOutHandler);
    FormNode.CHECKOUT.removeEventListener('change', changeCheckInHandler);
    FormNode.TYPE.removeEventListener('change', changeMinPriceHandler);
    FormNode.TITLE.removeEventListener('input', validateTitleHandler);
    FormNode.TYPE.removeEventListener('change', validatePriceHandler);
    FormNode.PRICE.removeEventListener('input', validatePriceHandler);
    FormNode.ROOM.removeEventListener('change', adjustRoomGuestsHandler);
    FormNode.GUESTS.removeEventListener('change', clearValidationHandler);
    FormNode.RESET_BUTTON.removeEventListener('click', resetForms);
    FORM_CONTAINER_NODE.removeEventListener('submit', submitFormHandler);
  }
}

const resetFormHandler = (evt) => {
  evt && evt.preventDefault();
  FORM_CONTAINER_NODE.reset();
  adjustRoomGuestsHandler();
  changeMinPriceHandler();
  removeImagePreview();
}

export { toggleForm, resetFormHandler, setAddress };
