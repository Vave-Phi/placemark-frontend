<script lang="ts">
  import type { Poi } from '../data/PoiStore';
  import { PoiCategory } from '../data/enums/PoiCategory';
  import { createEventDispatcher } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { enumKeys } from '../data/enums/EnumUtils';

  export let poi: Poi;
  const options: string[] = enumKeys(PoiCategory);
  const dispatch = createEventDispatcher();

  async function forward() {
    push(`/pois/${poi._id}`);
    dispatch('update', {poi});
  }

</script>

<form on:submit|preventDefault={forward}>
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
  <div class="columns">
    <div class="column field is-full">
      <label class="label">Category</label>
      <div class="select is-fullwidth">
        <select name="category" bind:value={poi.category}>
          <option value="" disabled selected>Select POI category</option>
          {#each options as option}
            <option value="{option}">{option}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
  <div class="field">
    <label class="label">Description</label>
    <textarea bind:value={poi.desc} class="textarea" placeholder="Enter description" name="desc"></textarea>
  </div>
  <button class="button is-link">Update POI</button>
</form>
