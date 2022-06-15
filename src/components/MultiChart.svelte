<script lang="ts">
  import Chart from 'svelte-frappe-charts';

  export let title = "Chart";
  export let type = 'pie'
  export let data;

  let redrawFlag = false;

  function redraw() {
    redrawFlag = true;
    setTimeout(() => redrawFlag = false, 0);
  }
</script>

<h1 class="title is-4">{title}</h1>
<div class="select is-fullwidth">
  <select name="type" bind:value={type} on:change={redraw}>
    <option value="pie">Pie Chart</option>
    <option value="bar">Bar Chart</option>
    <option value="donut">Donut Chart</option>
    <option value="percentage">Percentage Chart</option>
  </select>
</div>
{#if !redrawFlag}
  <Chart data={data} type={type}/>
{/if}
