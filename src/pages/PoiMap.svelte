<script lang="ts">
  import PlacemarkMenu from "../components/PlacemarkMenu.svelte";
  import Map from "../components/Map.svelte";
  import { getContext, onMount } from 'svelte';
  import { PoiService } from '../services/PoiService';
  import type { Poi } from '../data/PoiStore';
  import AddPoi from "../components/AddPoi.svelte";

  const poiService: PoiService = getContext('PoiService');
  let pois: Poi[] = []
  let loaded = false;
  let poiMap = null;

  onMount(async () => {
    pois = await poiService.find();
    loaded = true;
  });

  async function create(event) {
    const poi = await poiService.create(event.detail.poi);
    if (poi) {
      pois = [...pois, poi];
      poiMap.addMarker(poi);
    }
  }
</script>

<PlacemarkMenu active="map"/>
{#if loaded}
  <div class="columns">
    <div class="column has-text-centered">
      <Map items={pois} bind:this={poiMap}></Map>
    </div>
    <div class="column box has-text-centered">
      <h1 class="title is-4">Add a POI!</h1>
      <AddPoi on:create={create}></AddPoi>
    </div>
  </div>
{/if}
