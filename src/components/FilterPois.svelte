<script lang="ts">
  import { PoiCategory } from '../data/enums/PoiCategory';

  export let query: {name: string; category: PoiCategory};
  export let options: PoiCategory[] = [];
</script>

<form action="/pois" method="get">
  <div class="is-flex is-justify-content-end">
    <div class="field mr-4">
      <input class="input" type="text" placeholder="Enter POI name" name="name" value="{query.name}">
    </div>
    <div class="select mr-4">
      <select name="category" bind:value={query.category}>
        {#each options as option}
          <option value="{option.name}">{option.name}</option>
        {/each}
      </select>
    </div>
    <button class="button is-link">Find</button>
  </div>
</form>
