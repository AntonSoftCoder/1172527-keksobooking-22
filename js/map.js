import { TOKYO_CENTER, ICON_SIZE, MAIN_ICON_SIZE } from './constants.js';

const TILES_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILES_COPYRIGNT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ICON_URL = 'img/pin.svg';
const MAIN_ICON_URL = 'img/main-pin.svg';
const MAP_ZOOM = 10;

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
    point,
    {
      draggable: true,
      icon,
    }).addTo(map);
};

const createMap = (loadMapHandler) => {
  loadMapHandler(false);
  const map = L.map(MAP_CANVAS_NODE)
    .on('load', () => loadMapHandler(true))
    .setView(TOKYO_CENTER, MAP_ZOOM);

  createMapLayer(TILES_URL, TILES_COPYRIGNT).addTo(map);
  return map;
}

const createMainMarker = (map, setAddress) => {

  const mainIcon = createIcon(MAIN_ICON_URL, MAIN_ICON_SIZE);
  const mainMarker = createMarker(TOKYO_CENTER, mainIcon, map);
  mainMarker.on('moveend', (evt) => { setAddress(evt.target.getLatLng()); });
  setAddress(TOKYO_CENTER);
}

const createPopupMarkers = (map,  createCard) => (cards) => {
  const icon = createIcon(ICON_URL, ICON_SIZE);
  cards.forEach(card => {
    const marker = createMarker(card.location, icon, map);
    marker.bindPopup(createCard(card), { keepInView: true });
  });
};

const initMap = (toggleFormAdMapFilters, setAddress) => {
  const map = createMap(toggleFormAdMapFilters);
  createMainMarker(map, setAddress);
  return map;
}

export { initMap, createPopupMarkers };
