<script lang="ts">
  import 'leaflet/dist/leaflet.css';
  import { LeafletMap } from '../services/LeafletMap.js';
  import { onMount } from "svelte";
  import { Category } from '../data/enums/Category';
  import { enumKeys } from '../data/enums/EnumUtils';
  import type { Poi } from '../data/PoiStore';

  export let items: Poi[] = [];

  let map = null;
  const categories = enumKeys(Category);
  const mapConfig = {
    location: {lat: 49.01643, lng: 12.10176},
    zoom: 8,
    minZoom: 1,
  };

  export function addMarker(it: Poi, move = true) {
    map.addMarker({lat: it.lat, lng: it.lng}, it.name, it.category);
    if (move) map.moveTo(11, {lat: it.lat, lng: it.lng});
  }

  onMount(async () => {
    map = new LeafletMap("map-host", mapConfig);
    map.showZoomControl();
    categories.forEach(it => map.addLayerGroup(it));
    map.showLayerControl();
    items.forEach(it => addMarker(it, false));
  });
</script>


<div class="box" id="map-host" style="height:800px"></div>
