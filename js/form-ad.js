import { LOCATION_PRECISION, minPriceByApart, TITLE_LENGTH, MAX_HOUSING_PRICE} from './constants.js';
import { getLocationAsString } from './utils.js';

const FORM_CONTAINER = document.querySelector('.ad-form');
const FORM_HEADER_NODE = FORM_CONTAINER.querySelector('.ad-form-header');
const FORM_NODES = FORM_CONTAINER.querySelectorAll('.ad-form__element');
const MAP_FILTERS_CONTAINER = document.querySelector('.map__filters');
const MAP_FILTERS_NODES = MAP_FILTERS_CONTAINER.querySelectorAll('.map__filter');
const MAP_FILTERS_FEATURES_NODE = MAP_FILTERS_CONTAINER.querySelector('.map__features');

const FORM_ADDRESS_NODE = FORM_CONTAINER.querySelector('#address');
const FORM_TYPE_NODE = FORM_CONTAINER.querySelector('#type');
const FORM_PRICE_NODE = FORM_CONTAINER.querySelector('#price');
const FORM_CHECKIN_NODE = FORM_CONTAINER.querySelector('#timein');
const FORM_CHECKOUT_NODE = FORM_CONTAINER.querySelector('#timeout');
const FORM_TITLE_NODE = FORM_CONTAINER.querySelector('#title');
const FORM_ROOM_NODE = FORM_CONTAINER.querySelector('#room_number');
const FORM_CAPACITY_NODE = FORM_CONTAINER.querySelector('#capacity');
const FORM_GUEST_OPTIONS = FORM_CAPACITY_NODE.querySelectorAll('option');

const FORM_MAP_FILTERS_CONTAINERS = [FORM_CONTAINER, MAP_FILTERS_CONTAINER];
const NODES = [FORM_HEADER_NODE, ...FORM_NODES, MAP_FILTERS_FEATURES_NODE, ...MAP_FILTERS_NODES];

export const toggleFormAdMapFilters = (isShown) => {

  FORM_MAP_FILTERS_CONTAINERS.forEach( el => el.classList.toggle('ad-form--disabled', !isShown));
  NODES.forEach( el => el.disabled = !isShown );
}

export const setAddress = (location) => {
  FORM_ADDRESS_NODE.value = getLocationAsString(location, LOCATION_PRECISION);
}

const changeCheckOut = (evt) => {
  FORM_CHECKOUT_NODE.value = evt.target.value;
}

const changeCheckIn = (evt) => {
  FORM_CHECKIN_NODE.value = evt.target.value;
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

  const value = FORM_PRICE_NODE.value;
  const housingType = FORM_TYPE_NODE.value;
  if ( value < 0 || value < minPriceByApart[housingType]) {
    FORM_PRICE_NODE.setCustomValidity(`Минимальная цена для этого типа жилья: ${minPriceByApart[housingType]}. Введите цену в диапазоне ${minPriceByApart[housingType]} - ${MAX_HOUSING_PRICE} руб.`);
  } else if (value > MAX_HOUSING_PRICE) {
    FORM_PRICE_NODE.setCustomValidity(`Максимальная возможная цена за жильё ${MAX_HOUSING_PRICE} руб. Введите цену в диапазоне ${minPriceByApart[housingType]} - ${MAX_HOUSING_PRICE} руб.`);
  } else {
    FORM_PRICE_NODE.setCustomValidity('');
  }
  FORM_PRICE_NODE.reportValidity();
};

const adjustRoomGuests = () => {

  const roomCount = Number(FORM_ROOM_NODE.value);
  const selectedGuestOption = Number(FORM_CAPACITY_NODE.value);

  FORM_GUEST_OPTIONS.forEach((guestOption) => {
    const guestOptionValue = Number(guestOption.value);
    if (roomCount === 100) {
      guestOption.disabled = guestOptionValue > 0;
    } else {
      guestOption.disabled = guestOptionValue > roomCount || guestOptionValue === 0;
    }
    if (guestOptionValue === selectedGuestOption) {
      if (guestOption.disabled) {
        FORM_CAPACITY_NODE.setCustomValidity('Эта опция недоступна для выбранного варианта комнаты.');
        FORM_CAPACITY_NODE.reportValidity();
      } else {
        FORM_CAPACITY_NODE.setCustomValidity('');
      }
    }
  });
}

const clearValidation = (evt) => {
  evt.target.setCustomValidity('');
}

export const addEventsFormHandler = () => {

  FORM_CHECKIN_NODE.addEventListener('change', changeCheckOut);
  FORM_CHECKOUT_NODE.addEventListener('change', changeCheckIn);
  FORM_TYPE_NODE.addEventListener('change', changeMinPrice(FORM_PRICE_NODE, minPriceByApart));
  FORM_TITLE_NODE.addEventListener('input', validateTitle(TITLE_LENGTH.MIN, TITLE_LENGTH.MAX));
  FORM_TYPE_NODE.addEventListener('change', validatePrice);
  FORM_PRICE_NODE.addEventListener('input', validatePrice);
  FORM_ROOM_NODE.addEventListener('change', adjustRoomGuests);
  FORM_CAPACITY_NODE.addEventListener('change', clearValidation);
  adjustRoomGuests();
}
