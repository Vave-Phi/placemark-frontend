<script lang="ts">
  import { Category } from '../data/enums/Category';
  import { createEventDispatcher } from 'svelte';
  import { enumKeys } from '../data/enums/EnumUtils';

  const options: string[] = enumKeys(Category);
  const query: { name: string; category: string } = {name: '', category: ''};
  const dispatch = createEventDispatcher();

  function forward() {
    const filter = {...query};
    for (const key in filter) {
      if (!filter[key]) {
        delete filter[key];
      }
    }
    dispatch('filter', {query: filter});
  }

</script>

<form on:submit|preventDefault={forward}>
  <div class="is-flex is-justify-content-end">
    <div class="field mr-4">
      <input bind:value={query.name} class="input" type="text" placeholder="Enter POI name" name="name">
    </div>
    <div class="select mr-4">
      <select name="category" bind:value={query.category}>
        <option value='' selected>All</option>
        {#each options as option}
          <option value="{option}">{option}</option>
        {/each}
      </select>
    </div>
    <button class="button is-link">Find</button>
  </div>
</form>
