<script>
    import { lines, paperPosition } from '../stores'
    import { applyTopWarp } from '../api'
    import { pageHeight, pageWidth, outerMargin, viewWidth, viewHeight } from '../settings'

    export let warp;

</script>

<section class="page svg-container" style="transform: translateY({$paperPosition}%)">
    <svg class="strip-container" viewBox="0 0 {viewWidth} {viewHeight}" use:applyTopWarp={warp}>
        <rect fill="#fff" x={outerMargin} y={outerMargin} width={pageWidth} height={pageHeight} />
        {#each $lines as line}
            <path d={line} />
        {/each}
    </svg>
</section>