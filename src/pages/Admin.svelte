<script lang="ts">
  import PlacemarkMenu from "../components/PlacemarkMenu.svelte";
  import ListUsers from "../components/ListUsers.svelte";
  import { UserService } from "../services/UserService.ts";
  import { getContext, onMount } from "svelte";
  import { User } from "../data/UserStore.ts";
  import AdminAnalytics from "../components/AdminAnalytics.svelte";
  import { PoiService } from '../services/PoiService';
  import type { Poi } from '../data/PoiStore';

  const userService: UserService = getContext("UserService");
  const poiService: PoiService = getContext("PoiService");

  let users: User[];
  let pois: Poi[];

  onMount(async () => {
    users = await userService.find();
    pois = await poiService.find();
  });

  async function remove(event) {
    const id = event.detail.id;
    const deleted = await userService.delete(id);
    if (deleted) {
      users = users.filter(it => it._id !== id);
    }
  }
</script>

<PlacemarkMenu active="admin"/>

<section class="section">
  {#if users && pois}
    <AdminAnalytics pois="{pois}" users="{users}"/>
    <ListUsers {users} on:delete={remove}/>
  {/if}
</section>

