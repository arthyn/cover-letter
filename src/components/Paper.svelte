<script>
    import { lines, paperPosition, paperElement } from '../utils/stores'
    import { applyTopWarp } from '../utils/api'
    import { pageHeight, pageWidth, outerMargin, viewWidth, viewHeight, pageOuterMarginRatio, debug } from '../utils/settings'

    export let warp;

</script>

<section class="page svg-container" class:opacity-50={debug} bind:this={$paperElement}>
    <svg class="absolute top-0 left-0" viewBox="0 0 {viewWidth} {viewHeight}" use:applyTopWarp={warp}>
        <rect fill="#fff" x={outerMargin} y={outerMargin} width={pageWidth} height={pageHeight} />
        {#each $lines as line}
            <path d={line} />
        {/each}
    </svg>
</section>

<style lang="scss">
    .page {
        transform: translate3d(0, calc(100vw * 50 / 1200), 0);

        @media (min-width: 640px) {
            transform: translate3d(0, calc(100vw * 100 / 1200), 0);
        }

        @media (min-width: 1111px) {
            transform: translate3d(0, 93px, 0);
        }
    }
</style>