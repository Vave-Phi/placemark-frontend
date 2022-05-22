<script>
  import PlacemarkMenu from "../components/PlacemarkMenu.svelte";
  import FilterPois from "../components/FilterPois.svelte";
  import ListPois from "../components/ListPois.svelte";
  import AddPoi from "../components/AddPoi.svelte";
</script>

<PlacemarkMenu active="pois"/>

<section class="section">
  <FilterPois options={[]} query={{}}/>
  <ListPois pois={[]}/>
  <AddPoi/>
</section>
