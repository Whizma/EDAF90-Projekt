<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<img
			src="https://media.istockphoto.com/id/850219738/vector/pixel-book-pixel-art-cartoon-retro-game-style.jpg?s=170667a&w=0&k=20&c=OMRrA9MMiNIooFzzDIRlMvEdMZZIi8JxvXCN4bm4U9o="
			class="mr-3 h-6 sm:h-9"
			alt="Pog"
		/>
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Fett digitalt bibliotek
		</span>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/search">Search</NavLi>
	</NavUl>
</Navbar>
