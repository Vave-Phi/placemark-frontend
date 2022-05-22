<script lang="ts">
  import type { User } from '../data/UserStore';

  export let users: User[] = [];
</script>

{#each users as user}
  <div class="box box-link-hover-shadow">
    <h2 class="title">
      {user.firstName} {user.lastName}
    </h2>
    <span>E-Mail: {user.email}</span>
    <a href="/admin/delete/{user._id}" class="button">
        <span class="icon is-small">
          <i class="fas fa-trash"></i>
        </span>
    </a>
  </div>
{/each}
