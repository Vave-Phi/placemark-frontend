<script lang="ts">
  import type { Poi } from '../data/PoiStore';
  import { PoiCategory } from '../data/enums/PoiCategory';

  const options: PoiCategory[] = []
  export let poi: Poi;
</script>

<form action="/pois/update/{poi._id}" method="POST">
  <div class="field">
    <label class="label">POI Name</label>
    <input class="input" type="text" placeholder="Enter POI name" name="name" value="{poi.name}">
  </div>
  <div class="columns">
    <div class="column is-one-quarter-desktop is-one-quarter-tablet field">
      <label class="label">Latitude</label>
      <input class="input" type="text" placeholder="Enter latitude" name="lat" value="{poi.lat}">
    </div>
    <div class="column is-one-quarter-desktop is-one-quarter-tablet field">
      <label class="label">Longitude</label>
      <input class="input" type="text" placeholder="Enter longitude" name="lng" value="{poi.lng}">
    </div>
    <div class="column field is-half-desktop is-half-tablet is-full-mobile">
      <label class="label">Category</label>
      <div class="select is-fullwidth">
        <select name="category" bind:value={poi.category}>
          {#each options as option}
            <option value="{option.name}">{option.name}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
  <div class="field">
    <label class="label">Description</label>
    <textarea class="textarea" placeholder="Enter description" name="desc">{poi.desc}</textarea>
  </div>
  <button class="button is-link">Update POI</button>
</form>
