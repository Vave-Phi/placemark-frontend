<script lang="ts">
  import type { Poi } from '../data/PoiStore';
  import { createEventDispatcher } from 'svelte';

  export let pois: Poi[] = [];
  const dispatch = createEventDispatcher();

  async function forward(id: string) {
    dispatch('delete', {id});
  }
</script>

{#each pois as poi}
  <div class="box box-link-hover-shadow">
    <h2 class="title">
      {poi.name}
    </h2>
    <p class="mb-4">{poi.desc ?? '-'}</p>
    <a href="/#/pois/{poi._id}" class="button">
        <span class="icon is-small">
          <i class="fas fa-folder-open"></i>
        </span>
    </a>
    <a on:click={forward(poi._id)} class="button">
        <span class="icon is-small">
          <i class="fas fa-trash"></i>
        </span>
    </a>
  </div>
{/each}
