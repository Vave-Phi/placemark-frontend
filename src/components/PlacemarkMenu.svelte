<script>
  import PlacemarkBrand from "./PlacemarkBrand.svelte";
</script>


<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <PlacemarkBrand/>
  </div>
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a id="pois" class="button" href="/pois" > POIs </a>
          <a id="admin" class="button" href="/admin" > Admin </a>
          <a id="logout" class="button" href="/logout" > Logout </a>
        </div>
      </div>
    </div>
  </div>
</nav>
