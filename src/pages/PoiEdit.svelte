<script lang="ts">
  import PlacemarkMenu from "../components/PlacemarkMenu.svelte";
  import EditPoi from "../components/EditPoi.svelte";
  import { PoiService } from "../services/PoiService.ts";
  import { getContext, onMount } from "svelte";
  import { Poi } from "../data/PoiStore.ts";
  import ImageUpload from "../components/ImageUpload.svelte";

  export let params;
  const poiService: PoiService = getContext("PoiService");
  let poi: Poi | null;

  onMount(async () => {
    poi = await poiService.findOne(params.id);
  });

  async function update(event) {
    const newPoi: Poi = event.detail.poi;
    const id = newPoi._id;
    await poiService.update(id, {
      name: newPoi.name,
      desc: newPoi.desc,
      category: newPoi.category,
      lat: newPoi.lat,
      lng: newPoi.lng,
    });
  }

  async function uploadImage(event) {
    const {id, image}: Poi = event.detail;
    const url = await poiService.uploadImage(id, image);
    if (url) {
      poi.img = url;
    }
  }

  async function deleteImage(event) {
    const {id}: Poi = event.detail;
    await poiService.deleteImage(id);
    poi.img = null;
  }

</script>

<PlacemarkMenu active="pois"/>
<section class="section">
  {#if poi}
    <section class="columns">
      <div class="column is-half">
        <EditPoi {poi} on:update={update}/>
      </div>
      <div class="column is-half">
        <ImageUpload {poi} on:upload={uploadImage} on:delete={deleteImage}/>
      </div>
    </section>
  {/if}
</section>
