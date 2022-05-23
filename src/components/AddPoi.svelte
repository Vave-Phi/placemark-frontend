<script lang="ts">
  import type { PoiInput } from '../data/PoiStore';
  import { createEventDispatcher } from 'svelte';

  const poi: PoiInput = {name: ''};
  const dispatch = createEventDispatcher();

  async function forward() {
    dispatch('create', {poi});
  }
</script>

<form on:submit|preventDefault={forward}>
  <div class="field">
    <label class="label">POI Name</label>
    <input bind:value={poi.name} class="input" type="text" placeholder="Enter POI name" name="name">
  </div>
  <button class="button is-link">Add POI</button>
</form>
