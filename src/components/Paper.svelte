<script>
    import { lines, paperPosition, paperElement } from '../utils/stores'
    import { applyTopWarp } from '../utils/api'
    import { pageHeight, pageWidth, outerMargin, viewWidth, viewHeight } from '../utils/settings'

    export let warp;

</script>

<section class="page svg-container" style="transform: translate3d(0, calc({$paperPosition}% + 8.333vw), 0) rotate(0.01deg)" bind:this={$paperElement}>
    <svg class="strip-container" viewBox="0 0 {viewWidth} {viewHeight}" use:applyTopWarp={warp}>
        <rect fill="#fff" x={outerMargin} y={outerMargin} width={pageWidth} height={pageHeight} />
        {#each $lines as line}
            <path d={line} />
        {/each}
    </svg>
</section>