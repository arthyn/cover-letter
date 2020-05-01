<script>
    import { lines, paperPosition, paperElement } from '../utils/stores'
    import { applyTopWarp } from '../utils/api'
    import { pageHeight, pageWidth, outerMargin, viewWidth, viewHeight, pageOuterMarginRatio } from '../utils/settings'

    export let warp;

</script>

<section class="page svg-container" style="transform: translate3d(0, calc({$paperPosition}% + {pageOuterMarginRatio}vw), 0)" bind:this={$paperElement}>
    <svg class="strip-container" viewBox="0 0 {viewWidth} {viewHeight}" use:applyTopWarp={warp}>
        <rect fill="#fff" x={outerMargin} y={outerMargin} width={pageWidth} height={pageHeight} />
        {#each $lines as line}
            <path d={line} />
        {/each}
    </svg>
</section>