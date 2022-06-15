<script lang="ts">
  import type { Poi } from '../data/PoiStore';
  import { createEventDispatcher } from 'svelte';

  export let poi: Poi;
  let fileName = '';
  let image: FileList;
  let i = 0;
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
    dispatch('delete', {id: poi._id, url: poi.gallery[i]});
    i = Math.max(Math.min(i, poi.gallery.length - 1), 0);
  }

</script>

<div class="card">
  {#if poi.gallery?.length}
    <div>
      <div class="card-image">
        <figure class="image noselect">
          {#if i > 0}
            <div class="carousel previous is-fullheight is-align-items-center is-flex pl-2 pr-2" on:click={() => i--}>
              <span class="icon is-small"><i class="fas fa-chevron-left"></i></span>
            </div>
          {/if}
          <img src={poi.gallery[i]}>
          {#if i < poi.gallery.length - 1}
            <div class="carousel next is-fullheight is-align-items-center is-flex pl-2 pr-2" on:click={() => i++}>
              <span class="icon is-small"><i class="fas fa-chevron-right"></i></span>
            </div>
          {/if}
        </figure>
      </div>
    </div>
  {/if}
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
        {#if poi.gallery?.[i]}
          <button type="button" class="button is-danger" on:click={remove}>Delete</button>
        {/if}
      </div>
    </form>
  </div>
</div>

<style>
    .previous {
        z-index: 2;
    }

    .next {
        z-index: 2;
        right: 0;
    }

    .carousel {
        background-color: rgba(0, 0, 0, 0.3);
        color: white;
        position: absolute;
        top: 0;
        height: 100%;
    }

    .is-fullheight {
        height: 100%
    }

    .noselect {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
