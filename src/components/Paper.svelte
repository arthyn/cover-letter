<script>
    import { lines, paperDistance, animate, settings, windowWidth } from '../utils/stores'
    import { derived } from 'svelte/store'
    import { applyTopWarp } from '../utils/api'

    export let shredOptions;
    export let warp;
    let { pageHeight, pageWidth, outerMargin, viewWidth, viewHeight, pageOuterMarginRatio, max, debug } = $settings;
    let paperElement;
    let paperAnimation;
    let baseTransform = 0;
    let endTransform = 0;
    let keyframes = {};

    function transform(amount) {
        return `translate3d(0, ${amount}px, 0)`;
    }

    function calculateBaseTransform(windowWidth) {
        let decimalRatio = (pageOuterMarginRatio / 100);
        let width = windowWidth >= max ? max : windowWidth;

        return decimalRatio * width;
    }

    function updateTransforms(windowWidth, paperElement) {
        baseTransform = calculateBaseTransform(windowWidth);
        endTransform = paperElement ? paperElement.offsetHeight + baseTransform : baseTransform;
        paperDistance.set(endTransform - baseTransform);
    }

    windowWidth.subscribe(windowWidth => {
        updateTransforms(windowWidth, paperElement);
    });

    $: updateTransforms($windowWidth, paperElement);

    $: {
        keyframes = {
            transform: [transform(baseTransform), transform(endTransform)]
        }
    }

    function shred(animate) {
        if (!animate)
            return;

        paperAnimation = paperElement.animate(keyframes, shredOptions);
    }

    animate.subscribe(shouldAnimate => {
        shred(shouldAnimate);
    })

</script>

<section class="page svg-container" class:opacity-50={debug} bind:this={paperElement} style="transform: {transform(baseTransform)}">
    <svg class="absolute top-0 left-0" viewBox="0 0 {viewWidth} {viewHeight}">
        <rect fill="#fff" x={outerMargin} y={outerMargin} width={pageWidth} height={pageHeight} />
        {#each $lines as line}
            <path d={line} />
        {/each}
    </svg>
</section>