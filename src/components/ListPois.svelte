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
  <div class="box box-link-hover-shadow is-flex is-justify-content-space-between">
    <div class="pr-5">
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
    {#if poi.gallery?.length}
      <img src={poi.gallery[0]} class="image height-150">
    {/if}
  </div>
{/each}


<style>
    .height-150 {
        height: 150px;
    }
</style>
