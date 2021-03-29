import { getLocationAsString, toggleElements } from './utils.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const LOCATION_PRECISION = 5;

const MAX_HOUSING_PRICE = 1000000;

const PHOTO_SIZE = 70;

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

const toggleForm = (isShown) => () => {
  toggleElements(FORM_CONTAINER_NODE, Object.values(FormNode), isShown);
  toggleElements(FORM_CONTAINER_NODE, FORM_FEATURE_NODES, isShown);
}

const setAddress = (location) => {
  FormNode.ADDRESS.value = getLocationAsString(location, LOCATION_PRECISION);
}

const changeCheckOutHandler = (evt) => {
  FormNode.CHECKOUT.value = evt.target.value;
}

const changeCheckInHandler = (evt) => {
  FormNode.CHECKIN.value = evt.target.value;
}

const changeMinPriceHandler = (priceNode, serviceType) => (evt) => {
  priceNode.min = serviceType[evt.target.value];
  priceNode.placeholder = serviceType[evt.target.value];
}

const validateTitleHandler = (minValue, maxValue) => (evt) => {
  const node = evt.target;
  const valueLength = node.value.length;
  if (valueLength < minValue) {
    node.setCustomValidity(`Введенный текст должен состоять минимум из ${minValue} символов. Нужно ещё ${(minValue - valueLength)} симв.`);
  } else if (valueLength > maxValue) {
    node.setCustomValidity(`Введенный текст должен состоять максимум из ${maxValue} символов. Удалите лишние ${(maxValue - valueLength)} симв.`);
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

    reader.addEventListener('load', () => {
      imageNode.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
}

const createImageNodeHandler = (photoPreviewContainer, showImagePreview) => (evt) => {
  const imageNode = document.createElement('img');
  imageNode.src = '';
  imageNode.width = PHOTO_SIZE;
  imageNode.height = PHOTO_SIZE;
  showImagePreview(imageNode)(evt);
  photoPreviewContainer.replaceChildren(imageNode);
}

const addEventsFormHandler = (resetMainMarker) => {
  FormNode.AVATAR.addEventListener('change', showImagePreviewHandler(FormNode.AVATAR_PREVIEW));
  FormNode.PHOTO.addEventListener('change', createImageNodeHandler(FormNode.PHOTO_PREVIEW_CONTAINER, showImagePreviewHandler));
  FormNode.CHECKIN.addEventListener('change', changeCheckOutHandler);
  FormNode.CHECKOUT.addEventListener('change', changeCheckInHandler);
  FormNode.TYPE.addEventListener('change', changeMinPriceHandler(FormNode.PRICE, minPriceByApart));
  FormNode.TITLE.addEventListener('input', validateTitleHandler(TITLE_LENGTH.MIN, TITLE_LENGTH.MAX));
  FormNode.TYPE.addEventListener('change', validatePriceHandler);
  FormNode.PRICE.addEventListener('input', validatePriceHandler);
  FormNode.ROOM.addEventListener('change', adjustRoomGuestsHandler);
  FormNode.GUESTS.addEventListener('change', clearValidationHandler);
  FormNode.RESET_BUTTON.addEventListener('click', resetFormHandler(resetMainMarker));
  adjustRoomGuestsHandler();
}

const addSubmitHandler = (sendData) => {
  FORM_CONTAINER_NODE.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    sendData(formData);
  });
}

const resetFormHandler = (resetMainMarker) => (evt) => {
  evt && evt.preventDefault();
  FORM_CONTAINER_NODE.reset();
  adjustRoomGuestsHandler();
  resetMainMarker();
}

export { toggleForm, resetFormHandler, setAddress, addEventsFormHandler, addSubmitHandler };
