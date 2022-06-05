<script lang="ts">
  import PlacemarkBrand from "./PlacemarkBrand.svelte";
  import { push } from "svelte-spa-router";
  import { getContext, onMount } from "svelte";
  import { AuthService } from '../services/AuthService';
  import { currentUser } from "../data/UserStore";

  export let active;
  const authService: AuthService = getContext("AuthService");

  onMount(async () => {
    document.getElementById(active)?.classList.add("is-primary");
  })

  async function logout() {
    await authService.logout()
    push("/login")
  }
</script>


<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <PlacemarkBrand/>
  </div>
  <div class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a id="pois" class="button" href="/#/pois"> POIs </a>
          <a id="map" class="button" href="/#/map"> Map </a>
          {#if $currentUser.isAdmin}<a id="admin" class="button" href="/#/admin"> Admin </a>{/if}
          <a id="logout" class="button" on:click={logout}> Logout </a>
        </div>
      </div>
    </div>
  </div>
</nav>
