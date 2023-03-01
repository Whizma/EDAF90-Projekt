<script lang="ts">
	import { _searchOpenLibrary } from './+page';
	import type { SearchResult } from './+page';
	import { Card, Search, Heading, List, Li, Span, Button } from 'flowbite-svelte';
	import { writable } from 'svelte/store';
	let hCard = false;

	const searchResults = writable<SearchResult[]>([]);
	let query = '';
	let searchMade = false;

	async function onSubmit() {
		try {
			const results = await _searchOpenLibrary(query);
			searchResults.set(results);
			searchMade = true;
		} catch (error) {
			console.error('An error occurred:', error);
			searchResults.set([]);
			searchMade = true;
		}
	}

	$: results = $searchResults;
</script>

<div class="flex justify-center">
	<form class="flex gap-2 w-1/2" on:submit|preventDefault={onSubmit}>
		<Search type="text" bind:value={query} size="md" />
		<Button type="submit" class="!p-2.5">
			<svg
				class="w-5 h-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</Button>
	</form>
</div>

{#if searchMade}
	<div class="pt-2 flex flex-col items-center justify-center">
		<h1 class="flex text-2xl font-semibold">Search results</h1>
		{#if results.length}
			{#each results as result}
				<div class="block mx-2 items-center w-1/3 pt-2 pb-2">
					<Card img={result.isbn ? `https://covers.openlibrary.org/b/isbn/${result.isbn[0]}-L.jpg` : ""} horizontal reverse={hCard} alt="Book cover">
						<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							{result.title}
						</h5>
						<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
							by {#if result.author_name}{result.author_name.join(', ')}
							{:else}Unknown{/if}
						</p>
					</Card>
				</div>
			{/each}
		{:else}
			<p>No results found.</p>
		{/if}
	</div>
{/if}
