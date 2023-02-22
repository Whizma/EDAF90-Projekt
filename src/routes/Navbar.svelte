<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<img
			src="https://w7.pngwing.com/pngs/688/689/png-transparent-pogchamp-emote-memes-mixed-memes.png"
			class="mr-3 h-6 sm:h-9"
			alt="Pog"
		/>
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Fett digitalt library
		</span>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/">Trollad</NavLi>
	</NavUl>
</Navbar>
