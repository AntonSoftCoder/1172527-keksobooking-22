import { loadData, sendData, ServerUrl } from './api.js';
import { createCard } from './card.js';
import { toggleForm, resetFormHandler, setAddress } from './form-ad.js';
import { showLoadDataErrorAlert, AlertType, showAlert, onSuccess, Messages } from './alert.js';
import { isItemMatched, resetFiltersHandler, toggleFilters, FILTER_DELAY } from './filter.js';
import { createPopupMarkers, rerenderPopupMarkers, initMap, resetMainMarker } from './map.js';
import { getData, prepareData, storeData } from './store.js';

const filterData = _.throttle(() => {
  prepareData(isItemMatched);
  rerenderPopupMarkers(createCard, getData);
}, FILTER_DELAY);

const onLoadDataSuccess = (cards) => {
  storeData(cards);
  createPopupMarkers(createCard)(cards);
  toggleFilters(true, filterData);
}

const resetForms = (evt) => {
  resetFormHandler(evt);
  resetMainMarker(setAddress);
  resetFiltersHandler();
  filterData();
}

const afterInitMap = () => {
  toggleForm(true, resetForms, sendData(ServerUrl.POST, onSuccess(Messages.SEND_SUCCESS, resetForms), showAlert(AlertType.ERROR, Messages.SEND_ERROR)));
  loadData(ServerUrl.GET, onLoadDataSuccess, showLoadDataErrorAlert);
}

toggleFilters(false, filterData);
toggleForm(false, resetForms);
initMap(afterInitMap, setAddress);
