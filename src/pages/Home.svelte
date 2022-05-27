<script lang="ts">
  import PlacemarkMenu from "../components/PlacemarkMenu.svelte";
  import FilterPois from "../components/FilterPois.svelte";
  import ListPois from "../components/ListPois.svelte";
  import AddPoi from "../components/AddPoi.svelte";
  import { PoiService } from "../services/PoiService.ts";
  import { getContext, onMount } from "svelte";
  import { Poi } from "../data/PoiStore.ts";

  const poiService: PoiService = getContext("PoiService");
  let pois: Poi[];

  onMount(async () => {
    pois = await poiService.find();
  });

  async function create(event) {
    const poi = await poiService.create(event.detail.poi);
    if (poi) {
      pois = [...pois, poi];
    }
  }

  async function remove(event) {
    const id = event.detail.id;
    const deleted = await poiService.delete(id);
    if (deleted) {
      pois = pois.filter(it => it._id !== id);
    }
  }

  async function filter(event) {
    pois = await poiService.find(event.detail.query);
  }
</script>

<PlacemarkMenu active="pois"/>
<section class="section">
  <FilterPois on:filter={filter}/>
  <ListPois {pois} on:delete={remove}/>
  <AddPoi on:create={create}/>
</section>
