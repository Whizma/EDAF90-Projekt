<script>

  export let name = "world";
  import Navbar from "./Navbar.svelte";

</script>

<Navbar />

<div class="flex flex-col items-center justify-center h-screen">
  <h1 class="text-3xl font-bold">
    Hello {name}!
  </h1>
</div>


<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>