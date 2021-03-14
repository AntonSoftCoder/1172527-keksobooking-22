import { TOKYO_CENTER, ICON_SIZE, MAIN_ICON_SIZE } from './constants.js';
import { getPointAsLocation } from './utils.js';

const TILES_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILES_COPYRIGNT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ICON_URL = 'img/pin.svg';
const MAIN_ICON_URL = 'img/main-pin.svg';
const MAP_ZOOM = 13;

const MAP_CANVAS_NODE = document.querySelector('#map-canvas');

const createMapLayer = (tilesUrl, tilesCopyright) => {
  return L.tileLayer(
    tilesUrl,
    { attribution: tilesCopyright },
  );
};

const createIcon = (url, iconSize) => {
  return L.icon({
    iconUrl: url,
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize/2, iconSize],
  });
};

const createMarker = (point, icon, map) => {
  return L.marker(
    getPointAsLocation(point),
    {
      draggable: true,
      icon,
    }).addTo(map);
};

export const createMap = (loadMapHandler) => {
  loadMapHandler(false);
  const map = L.map(MAP_CANVAS_NODE)
    .on('load', () => loadMapHandler(true))
    .setView(getPointAsLocation(TOKYO_CENTER), MAP_ZOOM);

  createMapLayer(TILES_URL, TILES_COPYRIGNT).addTo(map);
  return map;
}

export const createMainMarker = (map, moveMarkerHandler, setAddress) => {

  const mainIcon = createIcon(MAIN_ICON_URL, MAIN_ICON_SIZE);
  const mainMarker = createMarker(TOKYO_CENTER, mainIcon, map);
  mainMarker.on('moveend', moveMarkerHandler);
  setAddress(getPointAsLocation(TOKYO_CENTER));
}

export const createPopupMarkers = (map, cards, createCard) => {

  const icon = createIcon(ICON_URL, ICON_SIZE);
  cards.forEach(card => {
    const marker = createMarker(card.location, icon, map);
    marker.bindPopup(createCard(card), { keepInView: true });
  });
};
