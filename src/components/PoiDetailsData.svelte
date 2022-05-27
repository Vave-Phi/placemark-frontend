<script lang="ts">
  import type { Poi } from '../data/PoiStore';

  export let poi: Poi;
</script>

<div class="box box-link-hover-shadow columns">
  <div class="column is-half">
    <h2 class="title">{poi.name}</h2>
    <p>{poi.category ?? '-'}</p>
    {#if poi.lat}<p>Lat: {poi.lat}</p> {/if}
    {#if poi.lng}<p>Long: {poi.lng}</p> {/if}
    <p class="pb-3">{poi.desc ?? '-'}</p>
    <a href="/#/pois/{poi._id}/edit" class="button">
      <span class="icon is-small">
        <i class="fas fa-edit"></i>
      </span>
    </a>
  </div>
  <div class="column is-half">
    {#if poi.img}
      <img class="image" src={poi.img} alt="Poi image">
    {/if}
  </div>
</div>
