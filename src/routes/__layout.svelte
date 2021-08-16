<script>
import LanguageSwitcher from '$lib/LanguageSwitcher.svelte';

import '../app.css';
</script>

<header>
    <h1>foodspeech</h1>
    <LanguageSwitcher></LanguageSwitcher>
</header>

<main>
	<slot />
</main>

<footer>
</footer>

<style>
.assistant {
    z-index: 1;
    appearance: none;
    border: none;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 60px;
    height: 60px;
    bottom: 20px;
    right: 20px;
    border-radius: 100%;
    color: var(--color-bg);
    background-color: var(--color-2);
}

h1 {
    text-align: center;
}

main {
    padding: 1rem;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
}

header, footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
