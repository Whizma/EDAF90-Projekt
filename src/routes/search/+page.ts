export interface SearchResult {
	title: string;
	author_name: string[];
	first_publish_year: number;
	isbn: string[];
	publisher: string[];
	subject: string[];
	language: string[];
	publish_year: number[];
	person: string[];
	place: string[];
}

export const _searchOpenLibrary = async (query: string): Promise<SearchResult[]> => {
	const response = await fetch(`https://openlibrary.org/search.json?q=${query}}`);
	const json = await response.json();
	return json.docs;
};

export const _fetchIsbn = async (query: string): Promise<SearchResult[]> => {
	const response = await fetch(`https://openlibrary.org/search.json?isbn=${query}`);
	const json = await response.json();
	return json.docs;
};

export const _advancedSearch = async (formData: FormData): Promise<SearchResult[]> => {
	let paramsArray: [string, string][] = [];

	for (const [key, value] of formData.entries()) {
		if (paramsArray.length === 0) {
			paramsArray.push(['', value.toString()]);
			continue;
		}
		if (value.toString()) {
			paramsArray.push([key, value.toString()]);
		}
	}

	const parameters = new URLSearchParams(paramsArray);

	const response = await fetch(`https://openlibrary.org/search.json?q${parameters.toString()}`);
	const json = await response.json();
	paramsArray = [];
	return json.docs;
};
