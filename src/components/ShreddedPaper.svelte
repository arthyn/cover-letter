<script>
    import Strip from './Strip.svelte'
    import { applyTopWarp } from '../utils/api'
    import { paperPosition, shreddedPaperElement } from '../utils/stores'
    import { pageHeight, pageWidth, outerMargin, viewWidth, viewHeight } from '../utils/settings'

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

<section class="page svg-container" style="transform: translate3d(0, {$paperPosition - 100}%, 0) rotate(0.01deg)" bind:this={$shreddedPaperElement}>
    {#each strips as strip}
        <Strip {...strip} {warp}></Strip>
    {/each}
</section>