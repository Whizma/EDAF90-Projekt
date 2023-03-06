<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
	const carouselPhotos = [
		'https://covers.openlibrary.org/b/id/13217026-L.jpg',
		'https://covers.openlibrary.org/b/isbn/9780717802418-L.jpg',
    'https://covers.openlibrary.org/b/id/13257896-L.jpg',
    'https://covers.openlibrary.org/b/id/12882777-L.jpg',
    'https://covers.openlibrary.org/b/id/12670684-L.jpg',
	'https://covers.openlibrary.org/b/id/13244471-L.jpg',
	'https://covers.openlibrary.org/b/id/12993656-L.jpg',
	'https://covers.openlibrary.org/b/id/13008986-L.jpg',
	'https://covers.openlibrary.org/b/id/12145320-L.jpg',
  'https://covers.openlibrary.org/b/id/11550609-L.jpg',
  'https://covers.openlibrary.org/b/id/13217026-L.jpg',
	];

	let index = 0;
	let interval: number = 0;

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
