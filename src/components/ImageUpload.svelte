<script lang="ts">
  import type { Poi } from '../data/PoiStore';
  import { createEventDispatcher } from 'svelte';

  export let poi: Poi;
  let fileName = '';
  let image: FileList;
  const dispatch = createEventDispatcher();

  async function upload() {
    dispatch('upload', {id: poi._id, image});
  }

  async function updateFile(event: Event) {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    if (fileInput.files.length > 0) {
      fileName = fileInput.files[0].name;
      image = fileInput.files;
    }
  }

  async function remove() {
    dispatch('delete', {id: poi._id});
  }

</script>

<div class="card">
  <div class="card-image">
    <figure class="image">
      <img src={poi.img}>
    </figure>
  </div>
  <div class="card-content">
    <form on:submit|preventDefault={upload}>
      <div id="file-select" class="file has-name is-fullwidth">
        <label class="file-label">
          <input class="file-input" type="file" accept="image/png, image/jpeg" on:change={updateFile}>
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
           </span>
          <span class="file-name">{fileName}</span>
        </label>
        <button type="submit" class="button is-info">Upload</button>
        {#if poi.img}
          <button type="button" class="button is-danger" on:click={remove}>Delete</button>
        {/if}
      </div>
    </form>
  </div>
</div>
