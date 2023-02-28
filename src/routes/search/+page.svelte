<script lang="ts">
	import { _searchOpenLibrary } from './+page';
	import type { SearchResult } from './+page';
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

<div>
	<form on:submit|preventDefault={onSubmit}>
		<input type="text" bind:value={query} />
		<button type="submit">Search</button>
	</form>

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
