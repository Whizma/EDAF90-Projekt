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

// note: vill försöka hämta bild från isbn efter sökningen är gjord 
// 			 så man kan se bokens framsida jämte informationen
//       typ såhär https://flowbite-svelte.com/components/card#Horizontal_card
export const _searchForCover = async (isbn: string): Promise<string> => {
	const response = await fetch(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`);
	return response.url;
};

export const _advancedSearch = async (formData: FormData): Promise<SearchResult[]>  => {
  const paramsArray: [string, string][] = [];

  for (const [key, value] of formData.entries()) {
    paramsArray.push([key, value.toString()]);
  }

  const params = new URLSearchParams(paramsArray);

	console.log(`https://openlibrary.org/search.json?q${params.toString()}`);
  const response = await fetch(`https://openlibrary.org/search.json?q${params.toString()}`);
  const json = await response.json();

  console.log(json.docs);

  return json.docs;
};

	
