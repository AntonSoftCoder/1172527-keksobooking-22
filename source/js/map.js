const TILES_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const TILES_COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const TOKYO_CENTER = {
  lat: 35.68355,
  lng: 139.75555,
}

const MAIN_ICON_PROPS = {
  URL: 'img/main-pin.svg',
  SIZE: 60,
}

const ICON_PROPS = {
  URL: 'img/pin.svg',
  SIZE: 40,
}

const MAP_ZOOM = 10;

const MAP_CANVAS_NODE = document.querySelector('#map-canvas');

let map = null;
let mainMarker = null;
let popupMarkers = [];

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

const icon = createIcon(ICON_PROPS.URL, ICON_PROPS.SIZE);

const main_icon = createIcon(MAIN_ICON_PROPS.URL, MAIN_ICON_PROPS.SIZE);

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
  createMapLayer(TILES_URL, TILES_COPYRIGHT).addTo(map);
}

const resetMainMarker = (setAddress) => () => {
  mainMarker.setLatLng(TOKYO_CENTER);
  map.panTo(TOKYO_CENTER);
  setAddress(TOKYO_CENTER);
};

const createMainMarker = (setAddress) => {
  mainMarker = createMarker(TOKYO_CENTER, main_icon);
  mainMarker.on('moveend', (evt) => { setAddress(evt.target.getLatLng()); });
  setAddress(TOKYO_CENTER);
}

const removePopupMarkers = () => {
  popupMarkers.forEach(marker => map.removeLayer(marker));
}

const createPopupMarkers = (createCard) => (cards) => {
  cards.forEach(card => {
    const marker = createMarker(card.location, icon);
    marker.bindPopup(createCard(card), { keepInView: true });
    popupMarkers.push(marker);
  });
};

const rerenderPopupMarkers = (createCard, getCards) => {
  removePopupMarkers();
  createPopupMarkers(createCard)(getCards());
}

const initMap = (enableForm, setAddress) => {
  createMap(enableForm);
  createMainMarker(setAddress);
}

export { initMap, createPopupMarkers, rerenderPopupMarkers, resetMainMarker };
