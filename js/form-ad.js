import { LOCATION_PRECISION, minPriceByApart, TITLE_LENGTH, MAX_HOUSING_PRICE, TOKYO_CENTER} from './constants.js';
import { getLocationAsString, toggleElements } from './utils.js';

const FORM_CONTAINER = document.querySelector('.ad-form');

const FormNode = {
  HEADER: FORM_CONTAINER.querySelector('.ad-form-header'),
  ADDRESS: FORM_CONTAINER.querySelector('#address'),
  TYPE: FORM_CONTAINER.querySelector('#type'),
  PRICE: FORM_CONTAINER.querySelector('#price'),
  CHECKIN: FORM_CONTAINER.querySelector('#timein'),
  CHECKOUT: FORM_CONTAINER.querySelector('#timeout'),
  TITLE: FORM_CONTAINER.querySelector('#title'),
  ROOM: FORM_CONTAINER.querySelector('#room_number'),
  GUESTS: FORM_CONTAINER.querySelector('#capacity'),
  RESET_BUTTON: FORM_CONTAINER.querySelector('.ad-form__reset'),
}

const FORM_FEATURE_NODES = FORM_CONTAINER.querySelectorAll('input[name=features]');
const FORM_GUEST_OPTIONS = FormNode.GUESTS.querySelectorAll('option');

const toggleForm = (isShown) => () => {
  // setTimeout(() => {
  toggleElements(FORM_CONTAINER, Object.values(FormNode), isShown);
  toggleElements(FORM_CONTAINER, FORM_FEATURE_NODES, isShown);
  // }, isShown ? 3000 : 0);
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
  const selectedGuestOption = Number(FormNode.GUESTS.value);

  FORM_GUEST_OPTIONS.forEach((guestOption) => {
    const guestOptionValue = Number(guestOption.value);
    if (roomCount === 100) {
      guestOption.disabled = guestOptionValue > 0;
    } else {
      guestOption.disabled = guestOptionValue > roomCount || guestOptionValue === 0;
    }
    if (guestOptionValue === selectedGuestOption) {
      if (guestOption.disabled) {
        FormNode.GUESTS.setCustomValidity('Эта опция недоступна для выбранного варианта комнаты.');
        FormNode.GUESTS.reportValidity();
      } else {
        FormNode.GUESTS.setCustomValidity('');
      }
    }
  });
}

const clearValidation = (evt) => {
  evt.target.setCustomValidity('');
}

const addEventsFormHandler = (resetMainMarker) => {

  FormNode.CHECKIN.addEventListener('change', changeCheckOut);
  FormNode.CHECKOUT.addEventListener('change', changeCheckIn);
  FormNode.TYPE.addEventListener('change', changeMinPrice(FormNode.PRICE, minPriceByApart));
  FormNode.TITLE.addEventListener('input', validateTitle(TITLE_LENGTH.MIN, TITLE_LENGTH.MAX));
  FormNode.TYPE.addEventListener('change', validatePrice);
  FormNode.PRICE.addEventListener('input', validatePrice);
  FormNode.ROOM.addEventListener('change', adjustRoomGuests);
  FormNode.GUESTS.addEventListener('change', clearValidation);
  FormNode.RESET_BUTTON.addEventListener('click', resetForm(resetMainMarker));
  adjustRoomGuests();
}

const addSubmitHandler = (sendData) => {
  FORM_CONTAINER.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    sendData(formData);
  });
}

const resetForm = (resetMainMarker) => (evt) => {
  evt && evt.preventDefault();
  FORM_CONTAINER.reset();
  adjustRoomGuests();
  resetMainMarker();
  setAddress(TOKYO_CENTER);
}

export { toggleForm, resetForm, setAddress, addEventsFormHandler, addSubmitHandler };
