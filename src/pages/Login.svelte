<script lang="ts">
  import { getContext } from "svelte";
  import { push } from "svelte-spa-router";
  import type { LoginUser } from '../data/UserStore';

  let user: LoginUser = {email: '', password: ''};
  const authService = getContext("AuthService");

  async function login() {
    let success = await authService.login(user)
    if (success) {
      push("/pois");
    } else {
      user = {email: '', password: ''}
      // errorMessage = "Invalid Credentials";
    }
  }
</script>

<section class="columns">
  <div class="column is-half-desktop p-6 is-flex is-flex-direction-column is-align-items-stretch">
    <div class="is-flex is-justify-content-center">
      <img class="image is-180x180" src="src/assets/placemark.png" alt="Placemark logo">
    </div>
    <h1 class="title has-text-centered">Log in</h1>
    <form on:submit|preventDefault={login}>
      <div class="field">
        <label class="label">Email</label>
        <input bind:value={user.email} class="input" type="text" placeholder="Enter email" name="email">
      </div>
      <div class="field">
        <label class="label">Password</label>
        <input bind:value={user.password} class="input" type="password" placeholder="Enter Password" name="password">
      </div>
      <div class="field pt-4 is-flex is-align-items-center">
        <button class="button is-link mr-4">Submit</button>
        <span>Don't have an account? <a href="/#/signup">Sign up</a></span>
      </div>
    </form>
  </div>
  <div class="column is-half-desktop is-hidden-mobile p-0">
    <img class="background-img" src="src/assets/gps-location.svg" alt="map">
  </div>
</section>

<style>
    .background-img {
        min-height: 100vh;
        object-fit: cover;
    }

    .is-180x180 {
        width: 180px;
        height: 180px;
    }
</style>
