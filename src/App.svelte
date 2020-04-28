<script>
    import { letterText, paperPosition, enableVibration } from './stores';
    import Paper from './components/Paper.svelte'
    import Shredder from './components/Shredder.svelte'
    import ShreddedPaper from './components/ShreddedPaper.svelte'

    let warp = false;

    function toggleWarp() {
        warp = !warp;
        console.log('warp switching to', warp)
    }
</script>

<main>
    <textarea class="input-box" bind:value={$letterText}></textarea>
    <button on:click={toggleWarp}>Toggle Warp</button>
    <Shredder>
        <div slot="top">
            <Paper {warp}></Paper>
        </div>
        <div slot="bottom">
            <ShreddedPaper {warp} stripCount="20"></ShreddedPaper>
        </div>
    </Shredder>

    <div class="controls">
        <div>
            <label for="paperPosition" class="text-white">Paper Position</label>
            <input id="paperPosition" type="range" max="200" bind:value={$paperPosition} />
        </div>
        <div>
            <input id="enableVibration" type="checkbox" bind:checked={$enableVibration} />
            <label for="enableVibration" class="text-white">Enable Vibration</label>
        </div>
    </div>
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
        width: var(--pageWidth);
        max-width: 100%;
        height: auto;
    }
    
    :global(.page) {
        position: relative;
        padding-bottom: 100%;
    }
	
	.input-box {
        width: 100%;
        max-width: 600px;
        height: 150px;
        color: var(--primary);
        background: transparent;
        border: 1px solid var(--primary);
    }

    .controls {
        position: fixed;
        top: 10px;
        right: 10px;
    }
</style>