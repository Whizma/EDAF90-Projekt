<script lang="ts">
	import { _searchOpenLibrary, _searchOpenLibraryJSON } from './+page';
	import type { SearchResult } from './+page';
	import { Card, Search, Button, Input } from 'flowbite-svelte';
	import { writable } from 'svelte/store';

	const searchResults = writable<SearchResult[]>([]);
	let query = '';
	let searchMade = false;

	async function onSubmit() {
		try {
			const results = await _searchOpenLibrary(query);
			searchResults.set(results);
			searchMade = true;
		} catch (error) {
			console.error('An error occurred:', error);
			searchResults.set([]);
			searchMade = true;
		}
	}

	$: results = $searchResults;

	let isTextShown = false;

	const toggleIsTextShown = () => {
		isTextShown = !isTextShown;
	};

	$: buttonText = isTextShown ? 'Hide advanced' : 'Show advanced';

	let formData = new FormData();

	function handleAdvancedSubmit(event: Event) {
		event.preventDefault();
		const data = Object.fromEntries(formData);
		console.log(_searchOpenLibraryJSON(data));
	}

	function handleAdvancedInput(event: Event) {
		const target = event.target as HTMLInputElement;
		formData.set(target.name, target.value);
	}
</script>

<div class="flex justify-center">
	<form class="flex gap-2 w-1/2" on:submit|preventDefault={onSubmit}>
		<Search type="text" bind:value={query} size="md" />
		<Button type="submit" class="!p-2.5">
			<svg
				class="w-5 h-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</Button>
	</form>
	<div class="pl-2">
		<Button gradient color="pinkToOrange" on:bind{toggleAdvanced} on:click={toggleIsTextShown}>
			{buttonText}</Button
		>
	</div>
</div>

{#if isTextShown}
	<form on:submit={handleAdvancedSubmit}>
		<div class="grid grid-cols-2 gap-10 w-1/2 mx-auto pt-5">
			<div>
				<Input
					style="margin-bottom: 10px;"
					type="text"
					id="hCard"
					on:input={handleAdvancedInput}
					name="title"
					placeholder="Title"
				/>
				<Input
					style="margin-bottom: 10px;"
					type="text"
					id="hCard"
					on:input={handleAdvancedInput}
					name="author_name"
					placeholder="Author"
				/>
				<Input
					style="margin-bottom: 10px;"
					type="text"
					id="hCard"
					on:input={handleAdvancedInput}
					name="publisher"
					placeholder="Publisher"
				/>
				<Input
					style="margin-bottom: 10px;"
					type="text"
					id="hCard"
					on:input={handleAdvancedInput}
					name="subject"
					placeholder="Subject"
				/>
				<Input
					style="margin-bottom: 10px;"
					type="text"
					id="hCard"
					on:input={handleAdvancedInput}
					name="isbn"
					placeholder="ISBN"
				/>
			</div>
			<div>
				<Input
					style="margin-bottom: 10px;"
					type="text"
					id="hCard"
					on:input={handleAdvancedInput}
					name="language"
					placeholder="Language"
				/>
				<Input
					style="margin-bottom: 10px;"
					type="text"
					id="hCard"
					on:input={handleAdvancedInput}
					name="publish_year"
					placeholder="Publish Year"
				/>
				<Input
					style="margin-bottom: 10px;"
					type="text"
					id="hCard"
					on:input={handleAdvancedInput}
					name="first_publish_year"
					placeholder="First Publish Year"
				/>
				<Input
					style="margin-bottom: 10px;"
					type="text"
					id="hCard"
					on:input={handleAdvancedInput}
					name="person"
					placeholder="Person"
				/>
				<Input
					style="margin-bottom: 10px;"
					type="text"
					id="hCard"
					on:input={handleAdvancedInput}
					name="place"
					placeholder="Place"
				/>
			</div>
		</div>
		<Button type="submit" class="!p-2.5">
			<svg
				class="w-5 h-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</Button>
	</form>
{/if}

{#if searchMade}
	<div class="pt-2 flex flex-col items-center justify-center">
		<h1 class="flex text-2xl font-semibold">Search results</h1>
		{#if results.length}
			{#each results as result}
				<div class="block mx-2 items-center w-1/3 pt-2 pb-2">
					<Card
						img={result.isbn ? `https://covers.openlibrary.org/b/isbn/${result.isbn[0]}-L.jpg` : ''}
						horizontal
						alt="Book cover"
						href="https://openlibrary.org/isbn/{result.isbn[0]}"
					>
						<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							{result.title}
						</h5>
						<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
							by {#if result.author_name}{result.author_name.join(', ')}
							{:else}Unknown{/if}
						</p>
						<div>
							<input type="checkbox" id="heart">
							<label for="heart">&#9829</label>
						</div>
					</Card>
				</div>
			{/each}
		{:else}
			<p>No results found.</p>
		{/if}
	</div>
{/if}

<style>
/* changes the color when selected */
input:checked ~ label {
  color: rgb(225, 25, 25);
}

/* for styling purpose only */
label {
  font-size: 2em;
}
</style>
