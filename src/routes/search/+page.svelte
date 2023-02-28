<script lang="ts">
  import { _searchOpenLibrary } from './+page';
  import type { SearchResult } from './+page';
  import { writable } from 'svelte/store';

  const searchResults = writable<SearchResult[]>([]);

  async function onSubmit() {
    const query = '...' 
    try {
      const results = await _searchOpenLibrary(query);
      searchResults.set(results);
    } catch (error) {
      console.error('An error occurred:', error);
      searchResults.set([]);
    }
  }

  $: results = $searchResults;
  console.log(results);

</script>

<div>
  <form on:submit|preventDefault={onSubmit}>
    <input type="text" name="query" />
    <button type="submit">Search</button>
  </form>

  {#if results.length}
    <ul>
      {#each results as result}
        <li>{result.title} by {result.author_name.join(', ')}</li>
      {/each}
    </ul>
  {:else}
    <p>No results found.</p>
  {/if}
</div>
