import { writable } from 'svelte/store';

interface SearchResult {
	title: string;
	author_name: string[];
	first_publish_year: number;
}

const searchResults = writable<SearchResult[]>([]);
export default async function searchOpenLibrary(query: string) {
  const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
  const json = await response.json();
  searchResults.set(json.docs);
}
