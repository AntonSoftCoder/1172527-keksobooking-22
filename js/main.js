import { createMainMarker, createMap, createPopupMarkers } from './map.js';

const map = createMap();
createPopupMarkers(map);
createMainMarker(map);
