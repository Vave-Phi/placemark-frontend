<script lang="ts">
  import PlacemarkMenu from "../components/PlacemarkMenu.svelte";
  import { getContext, onMount } from "svelte";
  import type { Poi } from '../data/PoiStore';
  import { PoiService } from '../services/PoiService';
  import PoiDetailsData from "../components/PoiDetailsData.svelte";

  const poiService: PoiService = getContext("PoiService");
  export let params;
  let poi: Poi | null;

  onMount(async () => {
    poi = await poiService.findOne(params.id);
  });

</script>

<PlacemarkMenu active="pois"/>

<section class="section">
  {#if poi}
    <PoiDetailsData poi="{poi}"/>
  {/if}
</section>
