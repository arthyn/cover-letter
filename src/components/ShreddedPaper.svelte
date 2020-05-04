<script>
    import Strip from './Strip.svelte'
    import { applyTopWarp } from '../utils/api'
    import { shreddedPaperDistance, animate, status, statusTypes, settings, windowWidth } from '../utils/stores'

    export let stripCount = 5;
    export let shredOptions;
    export let warp;
    let { pageHeight, pageWidth, outerMargin, viewWidth, viewHeight, shredderWidth, max, debug, pageOuterMarginPixels, mobile } = $settings;
    let shreddedPaperElement;
    let baseTransform = 0;
    let endTransform = 0;
    let shredKeyframes = {};
    let shredAnimation, dropAnimation;
    let strips = [];
    let gap = 10;
    let stripTemplate = {
        x: 0,
        y: outerMargin,
        height: pageHeight,
        width: (pageWidth / stripCount) - gap,
        warp
    }

    $: {
        strips = []
        for(let i=0; i<stripCount; i++) {
            strips.push({
               ...stripTemplate,
               x: (i * (stripTemplate.width + gap)) + outerMargin
            })
        }
    }

    function transform(amount) {
        return `translate3d(0, ${amount}, 0)`;
    }

    function calculateBaseTransform(windowWidth, shreddedPaperElement) {
        let shreddedWidth = (shredderWidth / 100) * windowWidth;
        let shreddedHeight = shreddedPaperElement ? shreddedPaperElement.offsetHeight : 0;
        let intoBoxOffset = windowWidth < mobile ? shreddedWidth * 150 / 1200 : 0;

        return (-1 * shreddedHeight) - intoBoxOffset;
    }

    function updateTransforms(windowWidth, shreddedPaperElement) {
        baseTransform = calculateBaseTransform(windowWidth, shreddedPaperElement);
        endTransform = -1.5 * pageOuterMarginPixels; //1/3 into shredder box;
        shreddedPaperDistance.set(endTransform - baseTransform);
    }

    windowWidth.subscribe(windowWidth => {
       updateTransforms(windowWidth, shreddedPaperElement); 
    });

    $: updateTransforms($windowWidth, shreddedPaperElement);

    $: {
        shredKeyframes = {
            transform: [transform(baseTransform + 'px'), transform(endTransform + 'px')]
        }
    }

    const dropAnimationOptions = {
        duration: 1000,
        delay: shredOptions.delay + shredOptions.duration - 100,
        easing: 'cubic-bezier(0.32, 0, 0.67, 0)',
        fill: 'forwards'
    }

    function drop(options) {
        return shreddedPaperElement.animate({
            transform: [transform(endTransform + 'px'), transform('150%')]
        }, options);
    }

    function shred(animate) {
        if (!animate)
            return;
        
        shredAnimation = shreddedPaperElement.animate(shredKeyframes, shredOptions);
        dropAnimation = drop(dropAnimationOptions);

        dropAnimation.onfinish = () => $status = statusTypes.letter;
    }
    
    animate.subscribe(shouldAnimate => {
        shred(shouldAnimate);
    })
</script>

<section class="page svg-container" bind:this={shreddedPaperElement} style="transform: {transform(baseTransform + 'px')}">
    {#each strips as strip}
        <Strip {...strip}></Strip>
    {/each}
</section>