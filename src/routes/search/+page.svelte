<script lang="ts">
	import { _searchOpenLibrary } from './+page';
	import type { SearchResult } from './+page';
  import { Search, Heading, List, Li, Span, Button } from 'flowbite-svelte';
	import { writable } from 'svelte/store';

	const searchResults = writable<SearchResult[]>([]);
  let query = '';

	async function onSubmit() {
		try {
			const results = await _searchOpenLibrary(query);
			searchResults.set(results);
		} catch (error) {
			console.error('An error occurred:', error);
			searchResults.set([]);
		}
	}

	$: results = $searchResults;
</script>

<form class="flex gap-2" on:submit|preventDefault={onSubmit}>
  <Search type="text" bind:value={query} size="md" />
  <Button type="submit" class="!p-2.5">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </Button>
</form>

<div>
	<!-- <form on:submit|preventDefault={onSubmit}>
		<input type="text" bind:value={query} />
    <Search >
      <button> Search </button>
    </Search>
		 <button type="submit">Search</button> 
	</form> -->

	{#if results.length}
		<ul>
			{#each results as result}
				<li>
					{result.title} by {#if result.author_name}{result.author_name.join(
							', '
						)}{:else}Unknown{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<p>No results found.</p>
	{/if}
</div>
