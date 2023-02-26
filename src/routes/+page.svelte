<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';
	import Navbar from './Navbar.svelte';
	const carouselPhotos = [
		'https://foodtank.com/wp-content/uploads/2021/07/alfons-morales-YLSwjSy7stw-unsplash.jpg',
		'https://img-cdn.inc.com/image/upload/w_1920,h_1080,c_fill/images/panoramic/GettyImages-577674005_492115_zfpgiw.jpg',
		'https://www.pixel4k.com/wp-content/uploads/2018/09/books-shelf-graffiti-art-4k_1536098329.jpg'
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
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
