<script lang="ts">
  import type { Poi } from '../data/PoiStore';
  import { createEventDispatcher } from 'svelte';

  export let poi: Poi;
  let clicked = false;
  const dispatch = createEventDispatcher();

  async function forward(id: string) {
    clicked = true;
    poi.visitedAmount = poi.visitedAmount ? poi.visitedAmount + 1 : 1;
    dispatch('visited', {id});
  }
</script>

<div class="box box-link-hover-shadow columns">
  <div class="column is-half">
    <h2 class="title">{poi.name}</h2>
    <p>{poi.category ?? '-'}</p>
    {#if poi.lat}<p>Lat: {poi.lat}</p> {/if}
    {#if poi.lng}<p>Long: {poi.lng}</p> {/if}
    <p class="pb-3">{poi.desc ?? '-'}</p>
    {#if poi.weather}
      <h3 class="title is-4">Weather</h3>
      <p>Weather: {poi.weather.weather[0].description}</p>
      <p>Temperature: {poi.weather.main.temp}°C</p>
      <p>Windspeed: {poi.weather.wind.speed}km/h</p>
      <p>Humidity: {poi.weather.main.humidity}%</p>
    {/if}
    <a href="/#/pois/{poi._id}/edit" class="button mt-4">
      <span class="icon is-small">
        <i class="fas fa-edit"></i>
      </span>
    </a>
    <button on:click={forward(poi._id)} disabled="{clicked}" class="button mt-4">
        <span class="icon is-small">
          <i class="fas fa-plus"></i>
        </span>
      <span>Visited by: {poi.visitedAmount ?? 0}</span>
    </button>
  </div>
  <div class="column is-half">
    {#if poi.img}
      <img class="image" src={poi.img} alt="Poi image">
    {/if}
  </div>
</div>
