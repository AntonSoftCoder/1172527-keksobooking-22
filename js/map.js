import { getCards } from './mocks.js';
import { createCard } from './card.js';
import { loadMapHandler } from './form-ad.js';
import { movePinHandler } from './form-ad.js';
import { TOKYO_CENTER, ICON_SIZE, MAIN_ICON_SIZE } from './constants.js';

const TILES_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILES_COPYRIGNT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const PIN_ICON_URL = 'img/pin.svg';
const MAIN_PIN_ICON_URL = 'img/main-pin.svg';
const MAP_ZOOM = 13;

const MAP_CANVAS_NODE = document.querySelector('#map-canvas');

const createMapLayer = (tilesUrl, tilesCopyright) => { return L.tileLayer(tilesUrl, { attribution: tilesCopyright })};

const createPin = (url, iconSize) => {
  return L.icon({ iconUrl: url, iconSize: [iconSize, iconSize], iconAnchor: [iconSize/2, iconSize]});
}

const createMarker = ({x, y}, icon, map) => {
  return L.marker({ lat: x, lng: y }, { draggable: true, icon }).addTo(map);
}

export const createMap = () => {
  loadMapHandler(false);
  const map = L.map(MAP_CANVAS_NODE)
    .on('load', () => loadMapHandler(true))
    .setView({ lat: TOKYO_CENTER.x, lng: TOKYO_CENTER.y }, MAP_ZOOM);

  createMapLayer(TILES_URL, TILES_COPYRIGNT).addTo(map);
  return map;
}

export const createMainMarker = (map) => {
  const mainPinIcon = createPin(MAIN_PIN_ICON_URL, MAIN_ICON_SIZE);
  const mainMarker = createMarker(TOKYO_CENTER, mainPinIcon, map);
  mainMarker.on('moveend', movePinHandler);
}

export const createPopupMarkers = (map) => {
  const pinIcon = createPin(PIN_ICON_URL, ICON_SIZE);
  getCards().forEach(card => {
    const marker = createMarker(card.location, pinIcon, map);
    marker.bindPopup(createCard(card), { keepInView: true });
  });
};
