import { loadData, sendData, ServerUrl } from './api.js';
import { createCard } from './card.js';
import { toggleForm, addSubmitHandler, resetFormHandler, setAddress, addEventsFormHandler } from './form-ad.js';
import { showLoadDataAlert, AlertType, showAlert, onSuccess, Messages } from './alert.js';
import { addEventsFilterHandler, isItemMatched, toggleFilters, FILTER_DELAY } from './filter.js';
import { createPopupMarkers, rerenderPopupMarkers, initMap, resetMainMarker } from './map.js';
import { getData, prepareData, storeData } from './store.js';

toggleFilters(false)();
toggleForm(false)();
initMap(toggleForm(true), setAddress);

const filterData = _.throttle(() => {
  prepareData(isItemMatched);
  rerenderPopupMarkers(createCard, getData);
}, FILTER_DELAY, { leading: false });

const onLoadDataSuccess = (cards) => {
  storeData(cards);
  createPopupMarkers(createCard)(cards);
  toggleFilters(true)();
  addEventsFilterHandler(filterData);
}

loadData(ServerUrl.GET, onLoadDataSuccess, showLoadDataAlert(Messages.LOAD_ERROR));

addEventsFormHandler(resetMainMarker(setAddress));

addSubmitHandler(sendData(ServerUrl.POST, onSuccess(Messages.SEND_SUCCESS, resetFormHandler(resetMainMarker(setAddress))), showAlert(AlertType.ERROR, Messages.SEND_ERROR)));
