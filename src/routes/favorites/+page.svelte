<script lang="ts">
	import { onMount } from 'svelte';
	import { _fetchIsbn } from '../search/+page';
	import type { SearchResult } from '../search/+page';
	import { Card, Button } from 'flowbite-svelte';
	import { writable } from 'svelte/store';

	const searchResults = writable<SearchResult[]>([]);

	const fetchResults = async () => {
		try {
			const favoritesIsbns = JSON.parse(localStorage.getItem('isbn') || '[]');
			const results = await Promise.all(
				favoritesIsbns.map(async (isbn: string) => {
					const result = await _fetchIsbn(isbn);
					return result;
				})
			);
			searchResults.set(results.flat());
		} catch {
			console.log('No favorites');
		}
	};

	fetchResults();
	$: results = $searchResults;

	const savedData = typeof localStorage !== 'undefined' ? localStorage.getItem('isbn') : null;
	const favs = writable(savedData ? JSON.parse(savedData) : []);

	onMount(() => {
		favs.subscribe((data) => {
			localStorage.setItem('isbn', JSON.stringify(data));
		});
	});

	const toggleFavorited = (value: string) => {
		favs.update((favs) => {
			const index = favs.indexOf(value);
			if (index !== -1) {
				favs.splice(index, 1);
			} else {
				favs.push(value);
			}
			return [...favs];
		});
	};
</script>

<div
	class="block mx-10 w-1000 items-center pt-2 pb-2"
	style="display: flex; justify-content: center; flex-wrap: wrap; gap: 20px;"
>
	{#if results.length}
		{#each results as result}
			{#if result}
				<Card
					img={result.isbn ? `https://covers.openlibrary.org/b/isbn/${result.isbn[0]}-L.jpg` : ''}
					horizontal
					alt="Book cover"
				>
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{result.title}
						<a href={result.isbn ? `/book/${result.isbn[0]}` : ''}>{result.title}</a>
					</h5>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
						by {#if result.author_name}{result.author_name.join(', ')}
						{:else}Unknown{/if}
					</p>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 tracking-tight">
						First publish year: {result.first_publish_year ? result.first_publish_year : ''}
					</p>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
						ISBN: {result.isbn[0] ? result.isbn[0] : ''}
					</p>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
						Publisher: {result.publisher[0] ? result.publisher[0] : ''}
					</p>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
						Available languages: {#if result.language}{result.language.join(', ')}
						{:else}Unknown{/if}
					</p>

					<Button
						gradient
						color="purpleToPink"
						on:bind{toggleFavorited(result.isbn[0])}
						on:click={() => toggleFavorited(result.isbn[0])}
					>
						{#if $favs.includes(result.isbn[0] ? result.isbn[0] : '')}
							Unfavorite &#9829
						{:else}
							Favorite &#9829
						{/if}
					</Button>
				</Card>
			{/if}
		{/each}
	{/if}
</div>
