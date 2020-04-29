<script>
    import { lines } from '../utils/stores'
    import { fly } from 'svelte/transition'
    import { quintIn, expoIn, elasticInOut } from 'svelte/easing'
    import { applyTopWarp } from '../utils/api'
    import { pageWidth, viewWidth, viewHeight } from '../utils/settings'

    export let warp;
    export let x = 0;
    export let y = 0;
    export let height = 1200;
    export let width = 50;

    let id = Math.round(x);
    let transition = false;
    const dir = Math.round(Math.random()) ? 1 : -1;
    const effect = Math.random() + .3;
    const multiplier = dir * effect;
    let params;
    //console.log(multiplier)

    $: {
        params = {
            warp,
            multiplier,
            wiggleLength: Math.random(),
            wiggleAmplitude: 16 * Math.random()
        }
    }

    $: {
        if(warp) {
            setTimeout(() => transition = true, Math.random() * 200);
        } else {
            transition = false;
        }
    }
</script>

{#if !transition}
<!--  -->
<svg class="strip-container svg-container" viewBox="0 0 {viewWidth} {viewHeight}" out:fly="{{ y: 1200, duration: 1000, easing: expoIn, opacity: 100 }}">
    <clipPath id={'clip-' + id} use:applyTopWarp={params}>
        <rect {x} {y} {height} {width} />
    </clipPath>
    <g id={'strip-' + id} clip-path="url(#{'clip-' + id})">
        <rect class="strip" x="0" {y} {height} width={viewWidth} />
        {#each $lines as line}
            <path d={line} />
        {/each}
    </g>
</svg>
{/if}

<style>
    :global(.strip-container) {
        position: absolute;
        top: 0;
        left: 0;
    }

    .strip {
        fill: #fff;
    }
</style>