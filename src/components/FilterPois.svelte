<script lang="ts">
  import { PoiCategory } from '../data/enums/PoiCategory';
  import { createEventDispatcher } from 'svelte';
  import { enumKeys } from '../data/enums/EnumUtils';

  const options: string[] = enumKeys(PoiCategory);
  const query: { name: string; category: string } = {name: '', category: ''};
  const dispatch = createEventDispatcher();

  function forward() {
    for (const key in query) {
      if (!query[key]) {
        delete query[key];
      }
    }
    dispatch('filter', {query});
  }

</script>

<form on:submit|preventDefault={forward}>
  <div class="is-flex is-justify-content-end">
    <div class="field mr-4">
      <input bind:value={query.name} class="input" type="text" placeholder="Enter POI name" name="name">
    </div>
    <div class="select mr-4">
      <select name="category" bind:value={query.category}>
        <option value="" selected>Select POI category</option>
        {#each options as option}
          <option value="{option}">{option}</option>
        {/each}
      </select>
    </div>
    <button class="button is-link">Find</button>
  </div>
</form>
