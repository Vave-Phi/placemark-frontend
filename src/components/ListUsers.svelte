<script lang="ts">
  import type { User } from '../data/UserStore';
  import { createEventDispatcher } from 'svelte';

  export let users: User[] = [];
  const dispatch = createEventDispatcher();

  async function forward(id: string) {
    dispatch('delete', {id});
  }
</script>

<h2 class="title">Placemark Users</h2>
{#each users as user}
  <div class="box box-link-hover-shadow">
    <h2 class="title">{user.firstName} {user.lastName}</h2>
    <div class="is-flex">
      <span class="mt-1 mr-4">E-Mail: {user.email}</span>
      <a on:click={forward(user._id)} class="button">
        <span class="icon is-small">
          <i class="fas fa-trash"></i>
        </span>
      </a>
    </div>
  </div>
{/each}
