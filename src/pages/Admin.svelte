<script lang="ts">
  import PlacemarkMenu from "../components/PlacemarkMenu.svelte";
  import ListUsers from "../components/ListUsers.svelte";
  import { UserService } from "../services/UserService.ts";
  import { getContext, onMount } from "svelte";
  import { User } from "../data/UserStore.ts";

  const userService: UserService = getContext("UserService");
  let users: User[];

  onMount(async () => {
    users = await userService.find();
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
  <ListUsers {users} on:delete={remove}/>
</section>

