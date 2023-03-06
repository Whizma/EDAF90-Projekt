<script lang="ts">
	import { _searchOpenLibrary, _advancedSearch } from './+page';
	import type { SearchResult } from './+page';
	import { Card, Search, Button, Input } from 'flowbite-svelte';
	import { writable } from 'svelte/store';
	import { onMount, onDestroy } from 'svelte';

	const searchResults = writable<SearchResult[]>([]);
	let query = '';
	let searchMade = false;

	async function onSubmit() {
		event?.preventDefault();
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

	$: buttonText = isTextShown ? 'Hide filters' : 'Show filters';

	let formData = new FormData();

	async function handleAdvancedSubmit(event: Event) {
		event.preventDefault();
		try {
			const results = await _advancedSearch(formData);
			searchResults.set(results);
			searchMade = true;
		} catch (error) {
			console.error('An error occurred:', error);
			searchResults.set([]);
			searchMade = true;
		}
	}

	function handleAdvancedInput(event: Event) {
		const target = event.target as HTMLInputElement;
		formData.set(target.name, target.value);
	}

	const savedData = typeof localStorage !== 'undefined' ? localStorage.getItem('isbn') : null;
	const favs = writable(savedData ? JSON.parse(savedData) : []);

	onMount(() => {
		favs.subscribe((data) => {
			localStorage.setItem('isbn', JSON.stringify(data));
		});
	});

	const toggleFavorited = (value: string) => {
		favs.update((favs) => {
			const index = favs.indexOf(value);
			if (index !== -1) {
				favs.splice(index, 1);
			} else {
				favs.push(value);
			}
			return [...favs];
		});
	};
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
		<div style="display: flex; justify-content: center; align-items: center; margin-top: 10px;">
			<Button type="submit" class="!p-2.5" style="width: 200px;">
				<span class="">Filter</span>
			</Button>
		</div>
	</form>
{/if}

{#if searchMade}
	<div class="pt-2 flex flex-col items-center justify-center">
		<h1 class="flex text-2xl font-semibold">Search results</h1>
		{#if results.length}
			{#each results as result}
				{#if result.isbn}
					<div class="block mx-2 items-center w-1/3 pt-2 pb-2">
						<Card
							img={result.isbn
								? `https://covers.openlibrary.org/b/isbn/${result.isbn[0]}-L.jpg`
								: ''}
							horizontal
							alt="Book cover"
						>
							<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								<a href={result.isbn ? `/book/${result.isbn[0]}` : ''}>{result.title}</a>
							</h5>
							<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
								by {#if result.author_name}{result.author_name.join(', ')}
								{:else}Unknown{/if}
							</p>
							<Button
								gradient
								color="purpleToPink"
								on:bind{toggleFavorited(result.isbn[0])}
								on:click={() => toggleFavorited(result.isbn[0])}
							>
								{#if $favs.includes(result.isbn[0] ? result.isbn[0] : '')}
									Unfavorite &#9829
								{:else}
									Favorite &#9829
								{/if}
							</Button>
						</Card>
					</div>
				{/if}
			{/each}
		{:else}
			<p>No results found.</p>
		{/if}
	</div>
{/if}
