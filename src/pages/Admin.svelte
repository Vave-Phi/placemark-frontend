<script>
  import PlacemarkMenu from "../components/PlacemarkMenu.svelte";
  import ListUsers from "../components/ListUsers.svelte";
</script>

<PlacemarkMenu active="admin"/>

<section class="section">
  <ListUsers users={[]}/>
</section>
