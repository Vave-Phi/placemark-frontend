<script lang="ts">
  import { enumKeys } from "../data/enums/EnumUtils.js";
  import { Category } from "../data/enums/Category.js";
  import type { Poi } from '../data/PoiStore';
  import { onMount } from 'svelte';
  import type { User } from '../data/UserStore';
  import MultiChart from "./MultiChart.svelte";

  export let pois: Poi[] = [];
  export let users: User[] = [];

  let poisPerCategoryData;
  let mostVisitedPoisData;
  let poisPerUserData;
  const categories = enumKeys(Category);

  function calculateAmountOfPoisPerCategory() {
    let countPerCategory = [];
    for (const category of categories) {
      const amount = pois.filter(poi => poi.category === category).length;
      countPerCategory.push(amount);
    }
    return countPerCategory;
  }

  function calculateAmountOfPoisPerUser() {
    let countPerUser = [];
    for (const user of users) {
      const amount = pois.filter(poi => poi.creator === user._id).length;
      countPerUser.push({amount, name: `${user.firstName} ${user.lastName}`});
    }
    return countPerUser.slice(0, 9).sort((a, b) => b.amount - a.amount);
  }

  function calculateMostVisitedPois() {
    const visitedAmounts = pois.map(poi => ({amount: poi.visitedAmount, name: poi.name}));
    return visitedAmounts.slice(0, 9).sort((a, b) => b.amount - a.amount);
  }

  function generatePoisPerCategoryDataset() {
    const values = calculateAmountOfPoisPerCategory();
    poisPerCategoryData = {labels: categories, datasets: [{values}]};
  }

  function generatePoisPerUserDataset() {
    const dataPoints = calculateAmountOfPoisPerUser();
    const labels = dataPoints.map(value => value.name);
    const values = dataPoints.map(value => value.amount);
    poisPerUserData = {labels, datasets: [{values}]};
  }

  function generateMostVisitedPoisDataset() {
    const dataPoints = calculateMostVisitedPois();
    const labels = dataPoints.map(value => value.name);
    const values = dataPoints.map(value => value.amount);
    mostVisitedPoisData = {labels, datasets: [{values}]};
  }

  onMount(() => {
    generatePoisPerCategoryDataset();
    generatePoisPerUserDataset();
    generateMostVisitedPoisDataset();
  })

</script>

<h2 class="title">Placemark Analytics</h2>
<div class="columns">
  <div class="column has-text-centered">
    <MultiChart data={poisPerUserData} type="bar" title="Top 10 PoI Creators"></MultiChart>
  </div>
  <div class="column has-text-centered">
    <MultiChart data={poisPerCategoryData} type="pie" title="PoIs per Category"></MultiChart>
  </div>
</div>
<div>
  <MultiChart data={mostVisitedPoisData} type="bar" title="Top 10 Most Visited PoIs"></MultiChart>
</div>
