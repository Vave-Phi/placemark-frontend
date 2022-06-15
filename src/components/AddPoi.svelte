<script lang="ts">
  import type { PoiInput } from '../data/PoiStore';
  import { createEventDispatcher } from 'svelte';

  let poi: PoiInput = {name: '', lat: null, lng: null};
  const dispatch = createEventDispatcher();

  async function forward() {
    dispatch('create', {poi});
    poi = {name: '', lat: null, lng: null};
  }
</script>

<form class="mb-4" on:submit|preventDefault={forward}>
  <div class="field">
    <label class="label">POI Name</label>
    <input bind:value={poi.name} class="input" type="text" placeholder="Enter POI name" name="name">
  </div>
  <div class="columns">
    <div class="column is-half field">
      <label class="label">Latitude</label>
      <input bind:value={poi.lat} class="input" type="text" placeholder="Enter latitude" name="lat">
    </div>
    <div class="column is-half field">
      <label class="label">Longitude</label>
      <input bind:value={poi.lng} class="input" type="text" placeholder="Enter longitude" name="lng">
    </div>
  </div>
  <button class="button is-link">Add POI</button>
</form>
