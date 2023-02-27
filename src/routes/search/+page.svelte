<script lang="ts">
  import { _searchOpenLibrary } from './+page';
  import type { SearchResult } from './+page';
  import { writable } from 'svelte/store';

  const searchResults = writable<SearchResult[]>([]);

  async function onSubmit() {
    const query = '...' 
    const results = await _searchOpenLibrary(query);
    searchResults.set(results);
  }

  $: results = $searchResults;
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
