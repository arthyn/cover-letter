<script>
    import { enableVibration, status, statusTypes, animate, paperDistance, shreddedPaperDistance, settings, windowWidth } from './utils/stores';
    import { onMount } from 'svelte'
    import { fade, fly, scale } from 'svelte/transition'
    import Paper from './components/Paper.svelte'
    import Shredder from './components/Shredder.svelte'
    import ShreddedPaper from './components/ShreddedPaper.svelte'
    import LetterGenerator from './components/LetterGenerator.svelte'
    import ActualLetter from './components/ActualLetter.svelte'

    let { shredderWidth, debug, mobile } = $settings;
    let warp = false;
    let container;
    let flyIn = {
        duration: 1500,
        y: window.innerHeight,
    }

    const shredOptions = {
        delay: $windowWidth < mobile ? 3000 : 1000,
        duration: 7500,
        easing: 'linear',
        fill: 'forwards'
    }

    function toggleWarp() {
        warp = !warp;
        debug && console.log('warp switching to', warp)
    }

    function scrollToTop(node) {
        if (!debug)
            setTimeout(() => container.scrollIntoView(true), 275);
    }

    function adjustDuration(duration, paperDistance, shreddedPaperDistance) {
        const ratio = paperDistance / shreddedPaperDistance;
        return duration * ratio;
    }

    function trackPageLoad() {
        setTimeout(() => {
            const perfData = window.performance.timing; 
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const renderTime = perfData.domComplete - perfData.domLoading;

            console.log(`%cThis page loaded in: %c${pageLoadTime}ms`, 'font-size: 16px; line-height: 1.5;', 'font-size: 20px; font-weight: 700; color: #2634fc');
            console.log(`%cThis page rendered in: %c${renderTime}ms`, 'font-size: 16px; line-height: 1.5;', 'font-size: 20px; font-weight: 700; color: #2634fc');
            console.log('%cHey! Feel free to email me any questions about this page at %chunter@hmiller.dev', 'font-size: 16px; line-height: 1.5;', 'font-size: 16px; line-height: 1.5; font-weight: 700; color: #2634fc');
        }, 0);
    }

    onMount(() => {
        if ("performance" in window)
            window.onload = trackPageLoad;
    })
</script>

<main class="relative w-full min-h-screen" style="--pageWidth: {shredderWidth}vw" bind:this={container}>
    {#if $status === statusTypes.intro || debug}
    <section class="screen justify-center" out:fade>
        <div class="max-w-2xl w-full mx-auto">
            <h1 class="mb-4 text-3xl sm:text-4xl font-bold leading-none">Hi I'm Hunter Miller!</h1>
            <LetterGenerator/>
        </div>
    </section>
    {/if}
    
    {#if $status === statusTypes.shredder || debug}
    <section class="screen" in:fly={flyIn} out:fade={{ duration: 250 }}>
        <Shredder {shredOptions}>
            <Paper shredOptions={{ ...shredOptions, duration: adjustDuration(shredOptions.duration, $paperDistance, $shreddedPaperDistance)}} {warp}></Paper>
            <div slot="bottom">
                <ShreddedPaper {shredOptions} {warp} stripCount="20"></ShreddedPaper>
            </div>
        </Shredder>
    </section>
    {/if}
    {#if $status === statusTypes.letter || debug}
        <section class="screen" use:scrollToTop in:fly={{...flyIn, delay: 270}}>
            <ActualLetter />
        </section>
    {/if}

    <div class="controls" class:hidden={!debug}>
        <div>
            <input id="enableVibration" type="checkbox" bind:checked={$enableVibration} />
            <label for="enableVibration" class="text-white">Enable Vibration</label>
        </div>
        <select class="text-black" bind:value={$status}>
            {#each Object.keys(statusTypes) as value}
                <option {value}>{value}</option>
            {/each}
        </select>
    </div>

    <footer class="absolute bottom-0 left-0 ml-2 sm:ml-8 md:ml-24 mb-4">&copy; 2020 <a class="hover:underline text-teal-300" href="https://hmiller.dev">Hunter Miller</a></footer>
</main>

<style lang="scss">
    $sm: 640px;

    :global(.svg-container) {
        width: var(--pageWidth);
        max-width: 560px;
        height: auto;

        @media (min-width: $sm) {
            max-width: 1000px;
        } 
    }
    
    :global(.page) {
        position: relative;
        padding-bottom: 150%;

        @media (min-width: $sm) {
            padding-bottom: 100%;
        }
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

    .screen {
        @apply flex flex-col items-center w-full min-h-screen px-4 py-8;
        transition: transform .7s ease-in;

        @media (min-width: $sm) {
            @apply p-8;
        }

        @media (min-width: 768px) {
            @apply p-24;
        }
    }
</style>