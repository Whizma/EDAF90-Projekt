<script lang="ts">
  import type { PageData } from './$types';
  import { Card } from 'flowbite-svelte';
  import type { SearchResult } from '../../search/+page';
  import { writable } from 'svelte/store';

  export let data: PageData;

  const searchResults = writable<SearchResult[]>([]);

  async function showBook() {
		try {
			searchResults.set(data.res);
		} catch (error) {
			console.error('An error occurred:', error);
			searchResults.set([]);
		}
	}

  showBook();
  const result = $searchResults[0];

</script>

<div class="block mx-2 items-center w-1/3 pt-2 pb-2">
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
  </Card>
</div>
