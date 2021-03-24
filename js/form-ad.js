import { LOCATION_PRECISION, minPriceByApart, TITLE_LENGTH, MAX_HOUSING_PRICE, TOKYO_CENTER} from './constants.js';
import { getLocationAsString, isEscEvent } from './utils.js';

const FORM_CONTAINER = document.querySelector('.ad-form');
const FORM_NODES = FORM_CONTAINER.querySelectorAll('.ad-form__element');
const MAP_FILTERS_CONTAINER = document.querySelector('.map__filters');
const MAP_FILTERS_NODES = MAP_FILTERS_CONTAINER.querySelectorAll('.map__filter');
const MAP_FILTERS_FEATURES_NODE = MAP_FILTERS_CONTAINER.querySelector('.map__features');

const FormNode = {
  HEADER: FORM_CONTAINER.querySelector('.ad-form-header'),
  ADDRESS: FORM_CONTAINER.querySelector('#address'),
  TYPE: FORM_CONTAINER.querySelector('#type'),
  PRICE: FORM_CONTAINER.querySelector('#price'),
  CHECKIN: FORM_CONTAINER.querySelector('#timein'),
  CHECKOUT: FORM_CONTAINER.querySelector('#timeout'),
  TITLE: FORM_CONTAINER.querySelector('#title'),
  ROOM: FORM_CONTAINER.querySelector('#room_number'),
  CAPACITY: FORM_CONTAINER.querySelector('#capacity'),
  RESET_BUTTON: FORM_CONTAINER.querySelector('.ad-form__reset'),
}

const FORM_GUEST_OPTIONS = FormNode.CAPACITY.querySelectorAll('option');
const FORM_MAP_FILTERS_CONTAINERS = [FORM_CONTAINER, MAP_FILTERS_CONTAINER];
const NODES = [FormNode.HEADER, ...FORM_NODES, MAP_FILTERS_FEATURES_NODE, ...MAP_FILTERS_NODES];

const AlertNode = {
  ERROR: document.querySelector('#error').content.querySelector('.error'),
  SUCCESS: document.querySelector('#success').content.querySelector('.success'),
}

const AlertType = {
  SUCCESS: {
    popupNode: AlertNode.SUCCESS.cloneNode(true),
    messageSelector: '.success__message',
    color: 'green',
  },

  ERROR: {
    popupNode: AlertNode.ERROR.cloneNode(true),
    messageSelector: '.error__message',
    color: 'red',
  },
}

const toggleFormAdMapFilters = (isShown) => {

  FORM_MAP_FILTERS_CONTAINERS.forEach( el => el.classList.toggle('ad-form--disabled', !isShown));
  NODES.forEach( el => el.disabled = !isShown );
}

const setAddress = (location) => {
  FormNode.ADDRESS.value = getLocationAsString(location, LOCATION_PRECISION);
}

const changeCheckOut = (evt) => {
  FormNode.CHECKOUT.value = evt.target.value;
}

const changeCheckIn = (evt) => {
  FormNode.CHECKIN.value = evt.target.value;
}

const changeMinPrice = (priceNode, serviceType) => (evt) => {
  priceNode.min = serviceType[evt.target.value];
  priceNode.placeholder = serviceType[evt.target.value];
}

const validateTitle = (minValue, maxValue) => (evt) => {
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

const validatePrice = () => {

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

const adjustRoomGuests = () => {

  const roomCount = Number(FormNode.ROOM.value);
  const selectedGuestOption = Number(FormNode.CAPACITY.value);

  FORM_GUEST_OPTIONS.forEach((guestOption) => {
    const guestOptionValue = Number(guestOption.value);
    if (roomCount === 100) {
      guestOption.disabled = guestOptionValue > 0;
    } else {
      guestOption.disabled = guestOptionValue > roomCount || guestOptionValue === 0;
    }
    if (guestOptionValue === selectedGuestOption) {
      if (guestOption.disabled) {
        FormNode.CAPACITY.setCustomValidity('Эта опция недоступна для выбранного варианта комнаты.');
        FormNode.CAPACITY.reportValidity();
      } else {
        FormNode.CAPACITY.setCustomValidity('');
      }
    }
  });
}

const clearValidation = (evt) => {
  evt.target.setCustomValidity('');
}

const addEventsFormHandler = () => {

  FormNode.CHECKIN.addEventListener('change', changeCheckOut);
  FormNode.CHECKOUT.addEventListener('change', changeCheckIn);
  FormNode.TYPE.addEventListener('change', changeMinPrice(FormNode.PRICE, minPriceByApart));
  FormNode.TITLE.addEventListener('input', validateTitle(TITLE_LENGTH.MIN, TITLE_LENGTH.MAX));
  FormNode.TYPE.addEventListener('change', validatePrice);
  FormNode.PRICE.addEventListener('input', validatePrice);
  FormNode.ROOM.addEventListener('change', adjustRoomGuests);
  FormNode.CAPACITY.addEventListener('change', clearValidation);
  FormNode.RESET_BUTTON.addEventListener('click', resetForm);
  adjustRoomGuests();
}

const addSubmitHandler = (sendData) => {
  FORM_CONTAINER.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    sendData(formData);
  });
}

const resetForm = () => {
  FORM_CONTAINER.reset();
  setAddress(TOKYO_CENTER);
  adjustRoomGuests();
}

const showLoadDataAlert = (message) => () => {
  const node = document.createElement('div');
  node.style.zIndex = 1000;
  node.style.position = 'fixed';
  node.style.left = 0;
  node.style.top = 0;
  node.style.right = 0;
  node.style.padding = '10px 3px';
  node.style.fontSize = '30px';
  node.style.textAlign = 'center';
  node.style.backgroundColor = 'red';

  node.textContent = message;

  document.body.append(node);

  setTimeout(() => {
    node.remove();
  }, 5000);
}

const showAlert = (alertType, message) => () => {
  alertType.popupNode.style.zIndex = 1000;
  const messageNode = alertType.popupNode.querySelector(alertType.messageSelector);
  messageNode.style.backgroundColor = alertType.color;
  messageNode.textContent = message;
  document.body.append(alertType.popupNode);
  addPopupClosingListener(alertType);
}

const closePopupByClickHandler = (alertType, timeoutId) => (evt) => {
  closePopup(alertType, timeoutId, evt);
};

const closePopupByEscapeHandler = (alertType, timeoutId) => (evt) => {
  if (isEscEvent(evt)) {
    closePopup(alertType, timeoutId, evt);
  }
};

const closePopup = (alertType, timeoutId) => {
  alertType.popupNode.removeEventListener('click', closePopupByClickHandler(alertType, timeoutId));
  alertType.popupNode.removeEventListener('keyup', closePopupByEscapeHandler(alertType, timeoutId));
  alertType.popupNode.remove();
  clearTimeout(timeoutId);
  if (alertType === AlertType.SUCCESS) {
    resetForm();
  }
}

const addPopupClosingListener = (alertType) => {
  const timeoutId = setTimeout(() => {
    closePopup(alertType, timeoutId);
  }, 5000);
  alertType.popupNode.addEventListener('click', closePopupByClickHandler(alertType, timeoutId));
  document.addEventListener('keyup', closePopupByEscapeHandler(alertType, timeoutId));
}

const onSuccess = (successMessage) => () => {
  showAlert(AlertType.SUCCESS, successMessage)();
}

export { AlertType, toggleFormAdMapFilters, setAddress, addEventsFormHandler, addSubmitHandler, showLoadDataAlert, showAlert, onSuccess };
