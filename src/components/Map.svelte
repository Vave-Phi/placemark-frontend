<script lang="ts">
  // import 'leaflet/dist/leaflet.css';
  import { LeafletMap } from '../services/LeafletMap.js';
  import { onMount } from "svelte";
  import { Category } from '../data/enums/Category';
  import { enumKeys } from '../data/enums/EnumUtils';
  import type { Poi } from '../data/PoiStore';
  import { push } from 'svelte-spa-router';

  export let items: Poi[] = [];
  export let id = 'map1';
  export let baseLayer = 'Terrain';
  export let height = 600;
  export let lat = 49.01643;
  export let lng = 12.10176;

  let map = null;
  const categories = enumKeys(Category);
  const mapConfig = {
    location: {lat, lng},
    zoom: 12,
    minZoom: 1,
  };

  export function addMarker(it: Poi, move = true) {
    map.addMarker({lat: it.lat, lng: it.lng}, it.name, it.category, () => goToPoi(it));
    if (move) map.moveTo(11, {lat: it.lat, lng: it.lng});
  }

  onMount(async () => {
    map = new LeafletMap(id, mapConfig, baseLayer);
    map.showZoomControl();
    categories.forEach(it => map.addLayerGroup(it));
    map.showLayerControl();
    items.forEach(it => addMarker(it, false));
  });

  function goToPoi(poi: Poi){
    push('/pois/' + poi._id);
  }
</script>


<div class="box" id="{id}" style="height: {height + 'px'}"></div>
