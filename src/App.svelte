<script>
	import { letterText } from './stores';
    import Paper from './components/Paper.svelte'
    import Shredder from './components/Shredder.svelte'

    let warp = false;

    function toggleWarp() {
        warp = !warp;
        console.log('warp switching to', warp)
    }
</script>

<main>
    <textarea class="input-box" bind:value={$letterText}></textarea>
    <button on:click={toggleWarp}>Toggle Warp</button>
	<Paper {warp} stripCount="6"></Paper>
    <Shredder></Shredder>
</main>


<style lang="scss">
    main {
        display: flex;
        flex-flow: column;
        align-items: center;
        width: 100%;
        min-height: 100vh;
        padding: 2rem;

        @media (min-width: 992px) {
            padding: 6rem 10%;
        }
    }

    button {
        margin-bottom: 50px;
    }

    :global(.svg-container) {
        width: 1200px;
        height: auto;
        max-width: 100%;
	}
	
	.input-box {
        width: 100%;
        max-width: 600px;
        height: 150px;
        color: var(--primary);
        background: transparent;
        border: 1px solid var(--primary);
    }
</style>