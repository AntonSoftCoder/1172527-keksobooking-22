import { loadData, sendData } from './api.js';
import { createCard } from './card.js';
import { ServerUrl, Messages } from './constants.js';
import { setAddress, addEventsFormHandler, showLoadDataAlert, onSuccess, showAlert, AlertType } from './form-ad.js';
import { toggleFormAdMapFilters, addSubmitHandler } from './form-ad.js';
import { createPopupMarkers, initMap } from './map.js';

const map = initMap(toggleFormAdMapFilters, setAddress);

loadData(ServerUrl.GET, createPopupMarkers(map, createCard), showLoadDataAlert(Messages.loadError));

addEventsFormHandler();

addSubmitHandler(sendData(ServerUrl.POST, onSuccess(Messages.sendSuccess), showAlert(AlertType.ERROR, Messages.sendError)));
