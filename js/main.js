import { loadData, sendData } from './api.js';
import { createCard } from './card.js';
import { ServerUrl, messages } from './constants.js';
import { toggleForm, addSubmitHandler, resetForm, setAddress, addEventsFormHandler } from './form-ad.js';
import { showLoadDataAlert, AlertType, showAlert, onSuccess } from './alert.js';
import { toggleFilters, addEventsFilterHandler } from './filter.js';
import { createPopupMarkers, filterPopupMarkers, initMap, resetMainMarker } from './map.js';
import { getData, storeData } from './store.js';

toggleFilters(false)();
toggleForm(false)();
initMap(toggleForm(true), setAddress);

const onLoadDataSuccess = (cards) => {
  storeData(cards);
  createPopupMarkers(createCard)(cards);
  toggleFilters(true)();
  addEventsFilterHandler(filterPopupMarkers(createCard, getData));
}

loadData(ServerUrl.GET, onLoadDataSuccess, showLoadDataAlert(messages.loadError));

addEventsFormHandler(resetMainMarker);

addSubmitHandler(sendData(ServerUrl.POST, onSuccess(messages.sendSuccess, resetForm(resetMainMarker)), showAlert(AlertType.ERROR, messages.sendError)));

// document.querySelector('#address').addEventListener('reset', (evt) => {
//   debugger;
// });
