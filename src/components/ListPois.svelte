<script lang="ts">
  import type { Poi } from '../data/PoiStore';

  export let pois: Poi[] = [];
</script>

{#each pois as poi}
  <div class="box box-link-hover-shadow">
    <h2 class="title">
      {{name}}
    </h2>
    <a href="/pois/{poi._id}" class="button">
        <span class="icon is-small">
          <i class="fas fa-folder-open"></i>
        </span>
    </a>
    <a href="/pois/delete/{poi._id}" class="button">
        <span class="icon is-small">
          <i class="fas fa-trash"></i>
        </span>
    </a>
  </div>
{/each}
