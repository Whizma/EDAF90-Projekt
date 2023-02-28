<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';
	const carouselPhotos = [
		'https://covers.openlibrary.org/b/isbn/9780385533225-L.jpg',
		'https://covers.openlibrary.org/b/isbn/9780717802418-L.jpg',
	];

	let index = 0;
	let interval: number  = 0;

	const next = () => {
		index = (index + 1) % carouselPhotos.length;
	};

	onMount(() => {
		interval = window.setInterval(next, 5000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

{#each [carouselPhotos[index]] as src (index)}
	<img transition:fade {src} alt="" />
{/each}

<style>
	img {
  display: block;
  margin: auto;
	width: 30%;
	height: auto;
	}
</style>
