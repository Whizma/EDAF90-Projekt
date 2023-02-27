export interface SearchResult {
  title: string;
  author_name: string[];
  first_publish_year: number;
}

export const _searchOpenLibrary = async (query: string): Promise<SearchResult[]> => {
  const response = await fetch(`https://openlibrary.org/search.json?q=$tolkien`);
  const json = await response.json();
  console.log(json.docs);
  return json.docs;
}
