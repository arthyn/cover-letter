<script>
    import Strip from './Strip.svelte'
    import { applyTopWarp } from '../api'
    import { paperPosition } from '../stores'
    import { pageHeight, pageWidth, outerMargin, viewWidth, viewHeight } from '../settings'

    export let warp;
    export let stripCount = 5;
    let strips = [];
    let gap = 10;
    let stripTemplate = {
        x: 0,
        y: outerMargin,
        height: pageHeight,
        width: (pageWidth / stripCount) - gap
    }
    let background;

    $: {
        strips = []
        for(let i=0; i<stripCount; i++) {
            strips.push({
               ...stripTemplate,
               x: (i * (stripTemplate.width + gap)) + outerMargin
            })
        }
    }
</script>

<section class="page svg-container" style="transform: translateY(calc({$paperPosition - 100}% + 45px))">
    <!-- <svg class="strip-container" viewBox="0 0 {viewWidth} {viewHeight}" use:applyTopWarp={warp}>
        <rect fill="#fff" x={outerMargin} y={outerMargin} width={pageWidth} height={pageHeight} />
    </svg> -->
    {#each strips as strip}
        <Strip {...strip} {warp}></Strip>
    {/each}
</section>