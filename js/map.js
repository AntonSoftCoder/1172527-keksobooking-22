import { TOKYO_CENTER, ICON_SIZE, MAIN_ICON_SIZE } from './constants.js';

const TILES_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILES_COPYRIGNT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ICON_URL = 'img/pin.svg';
const MAIN_ICON_URL = 'img/main-pin.svg';
const MAP_ZOOM = 10;

const MAP_CANVAS_NODE = document.querySelector('#map-canvas');
let map = null;

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

const ICON = createIcon(ICON_URL, ICON_SIZE);
const MAIN_ICON = createIcon(MAIN_ICON_URL, MAIN_ICON_SIZE);
let popupMarkers = [];
let mainMarker = null;

const createMarker = (point, icon) => {
  return L.marker(
    point,
    {
      draggable: true,
      icon,
    }).addTo(map);
};

const createMap = (enableForm) => {
  map = L.map(MAP_CANVAS_NODE)
    .on('load', () => enableForm())
    .setView(TOKYO_CENTER, MAP_ZOOM);
  createMapLayer(TILES_URL, TILES_COPYRIGNT).addTo(map);
}

const resetMainMarker = () => {
  mainMarker.setLatLng(TOKYO_CENTER);
  map.panTo(TOKYO_CENTER);
};

const createMainMarker = (setAddress) => {
  mainMarker = createMarker(TOKYO_CENTER, MAIN_ICON);
  mainMarker.on('moveend', (evt) => { setAddress(evt.target.getLatLng()); });
  setAddress(TOKYO_CENTER);
}

const removePopupMarkers = () => {
  popupMarkers.forEach(marker => map.removeLayer(marker));
}

const createPopupMarkers = (createCard) => (cards) => {
  cards.forEach(card => {
    const marker = createMarker(card.location, ICON);
    marker.bindPopup(createCard(card), { keepInView: true });
    popupMarkers.push(marker);
  });
};

const filterPopupMarkers = (createCard, getCards) => () => {
  removePopupMarkers();
  createPopupMarkers(createCard)(getCards());
}

const initMap = (enableForm, setAddress) => {
  createMap(enableForm);
  createMainMarker(setAddress);
}

export { initMap, createPopupMarkers, filterPopupMarkers, resetMainMarker };
