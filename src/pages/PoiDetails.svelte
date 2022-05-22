<script>
  import PlacemarkMenu from "../components/PlacemarkMenu.svelte";
  import PoiDetails from "../components/PoiDetails.svelte";
</script>

<PlacemarkMenu active="pois"/>

<section class="section">
  <PoiDetails poi="{{}}"/>
</section>
