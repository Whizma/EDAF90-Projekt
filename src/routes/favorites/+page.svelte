<script lang="ts">
	import { _fetchIsbn } from '../search/+page';
	import type { SearchResult } from '../search/+page';
	import { Card } from 'flowbite-svelte';
	import { writable } from 'svelte/store';

	const searchResults = writable<SearchResult[]>([]);

	const fetchResults = async () => {
		try {
			const favoritesIsbns = JSON.parse(localStorage.getItem('isbn') || '[]');
			const results = await Promise.all(
				favoritesIsbns.map(async (isbn: string) => {
					const result = await _fetchIsbn(isbn);
					console.log(result);
					return result;
				})
			);
			searchResults.set(results);
			console.log($searchResults);
		}
		catch {
			console.log('No favorites');
		}
	};

	fetchResults();
	$: results = $searchResults;
</script>

<div class="block mx-10 w-1000 items-center pt-2 pb-2">
	{#if results.length}	
	{#each results as result}
			{#if result}
				<Card
					img={result.isbn ? `https://covers.openlibrary.org/b/isbn/${result.isbn[0]}-L.jpg` : ''}
					horizontal
					alt="Book cover"
					href={result.isbn ? `https://openlibrary.org/isbn/${result.isbn[0]}` : ''}
				>
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{result.title}
					</h5>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
						by {#if result.author_name}{result.author_name.join(', ')}
						{:else}Unknown{/if}
					</p>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 tracking-tight">
						First publish year: {result.first_publish_year}
					</p>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
						ISBN: {result.isbn[0]}
					</p>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
						Publisher: {result.publisher[0]}
					</p>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
						Available languages: {result.language.join(', ')}
					</p>
				</Card>
			{/if}
		{/each}
		{/if}
</div>
