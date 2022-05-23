<script lang="ts">
  import PlacemarkMenu from "../components/PlacemarkMenu.svelte";
  import EditPoi from "../components/EditPoi.svelte";
  import { PoiService } from "../services/PoiService.ts";
  import { getContext, onMount } from "svelte";
  import { Poi } from "../data/PoiStore.ts";

  export let params;
  const poiService: PoiService = getContext("PoiService");
  let poi: Poi | null;

  onMount(async () => {
    poi = await poiService.findOne(params.id);
  });

  async function update(event) {
    const poi: Poi = event.detail.poi;
    const id = poi._id;
    await poiService.update(id, {
      name: poi.name,
      desc: poi.desc,
      category: poi.category,
      lat: poi.lat,
      lng: poi.lng,
    });
  }
</script>

<PlacemarkMenu active="pois"/>
<section class="section">
  {#if poi}
    <EditPoi {poi} on:update={update}/>
  {/if}
</section>
