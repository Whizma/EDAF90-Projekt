export interface SearchResult {
	title: string;
	author_name: string[];
	first_publish_year: number;
	isbn: string[];
}

export const _searchOpenLibrary = async (query: string): Promise<SearchResult[]> => {
	const response = await fetch(`https://openlibrary.org/search.json?q=${query}}`);
	const json = await response.json();
	return json.docs;
};

export const _searchForCover = async (isbn: string): Promise<string> => {
	const response = await fetch(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`);
	return response.url;
};
