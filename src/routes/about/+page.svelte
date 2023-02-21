<Navbar />

<div class="flex flex-col items-center justify-center h-screen">
  <h1 class="text-3xl font-bold">
    testar ny {name}!
  </h1>
</div>


<script>
  export let name = "komponent";
  console.log("testar ny komponent");
  import Navbar from "../Navbar.svelte";
  import { onMount } from "svelte";
  onMount(() => {
    console.log("testar navbar");
  });
</script>