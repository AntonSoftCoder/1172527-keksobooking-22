import { setAddress, addEventsFormHandler } from './form-ad.js';
import { createMainMarker, createMap, createPopupMarkers } from './map.js';
import { getCards } from './mocks.js';
import { createCard } from './card.js';
import { toggleFormAdMapFilters } from './form-ad.js';

const moveMarkerHandler = (evt) => {
  setAddress(evt.target.getLatLng());
}

const map = createMap(toggleFormAdMapFilters);
createPopupMarkers(map, getCards(), createCard);
createMainMarker(map, moveMarkerHandler, setAddress);

addEventsFormHandler();
