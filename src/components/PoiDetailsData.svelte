<script lang="ts">
  import type { Poi } from '../data/PoiStore';
  import { createEventDispatcher } from 'svelte';
  import Map from "./Map.svelte";

  export let poi: Poi;

  let poiMap = null;
  let clicked = false;

  const dispatch = createEventDispatcher();

  async function forward(id: string) {
    clicked = true;
    poi.visitedAmount = poi.visitedAmount ? poi.visitedAmount + 1 : 1;
    dispatch('visited', {id});
  }
</script>

<div>
  <div class="is-flex is-justify-content-space-between">
    <div class="is-flex">
      <h2 class="title">
        {poi.name}
        {#if poi.category}<span>({poi.category})</span>{/if}
      </h2>
      <button on:click={forward(poi._id)} disabled="{clicked}" class="button ml-4">
        <span>I've been there! ({poi.visitedAmount ?? 0})</span>
        <span class="icon is-small"><i class="fas fa-plus"></i></span>
      </button>
    </div>
    <a href="/#/pois/{poi._id}/edit" class="button">
      <span class="icon is-small"><i class="fas fa-edit"></i></span>
    </a>
  </div>
  <div class="columns">
    <div class="column is-half">
      <Map items={[poi]} bind:this={poiMap} id="satellite" baseLayer="Satellite"
           height=300 lat={poi.lat} lng="{poi.lng}"></Map>
    </div>
    <div class="column is-half">
      <Map items={[poi]} bind:this={poiMap} id="terrain" height=300 lat={poi.lat} lng="{poi.lng}"></Map>
    </div>
  </div>
  <div class="columns">
    <div class="column is-half">
      <label class="label">Description</label>
      <p class="pb-3">{poi.desc ?? '-'}</p>
    </div>
    <div class="column is-half">
      {#if poi.weather}
        <label class="label">Weather</label>
        <p>Weather: {poi.weather.weather[0].description}</p>
        <p>Temperature: {poi.weather.main.temp}°C</p>
        <p>Windspeed: {poi.weather.wind.speed}km/h</p>
        <p>Humidity: {poi.weather.main.humidity}%</p>
      {/if}
    </div>
  </div>
  <div class="pt-4">
    {#if poi.gallery?.length}
      <label class="label">Images</label>
      <div class="is-flex is-flex-wrap-wrap">
        {#each poi.gallery as img}
          <div>
            <img src="{img}" alt="{poi.name}" class="image height-200">
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
    .height-200 {
        height: 200px;
    }
</style>
