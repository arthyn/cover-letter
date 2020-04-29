<script>
    import { letterText, paperPosition, enableVibration } from './utils/stores';
    import Paper from './components/Paper.svelte'
    import Shredder from './components/Shredder.svelte'
    import ShreddedPaper from './components/ShreddedPaper.svelte'
    import LetterGenerator from './components/LetterGenerator.svelte'

    let warp = false;

    function toggleWarp() {
        warp = !warp;
        console.log('warp switching to', warp)
    }
</script>

<main class="w-full min-h-screen">
    <section class="flex flex-col justify-center items-center h-screen p-8 md:p-24">
        <h1 class="text-4xl font-bold mb-12">Hi I'm Hunter Miller!<br>Welcome to my cover letter generator.</h1>
        <LetterGenerator/>
    </section>
    <section class="flex flex-col items-center p-8 md:p-24">
        <Shredder>
            <div slot="top">
                <Paper {warp}></Paper>
            </div>
            <div slot="bottom">
                <ShreddedPaper {warp} stripCount="20"></ShreddedPaper>
            </div>
        </Shredder>
    </section>

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
    :global(.svg-container) {
        width: var(--pageWidth);
        max-width: 560px;
        height: auto;

        @media (min-width: 600px) {
            max-width: 1200px;
        } 
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