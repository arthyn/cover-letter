<script>
    import { onMount } from 'svelte'
    import { fly } from 'svelte/transition'
    import { viewWidth, viewHeight, pageOuterMarginRatio, mobile, debug } from '../utils/settings'
    import { 
        enableVibration, 
        shredderElement, 
        paperElement, 
        shreddedPaperElement,
        status,
        statusTypes
    } from '../utils/stores'

    let topHeight = mobile ? 75 : 50;
    let bottomHeight = mobile ? 300 : 150;
    let edge = mobile ? 10 : 5;
    let halfEdge = edge / 2;
    let outsideWidth = viewWidth - edge;
    let slotOffset = mobile ? 25 : 50;
    let slotHeight = mobile ? 150 : 50;
    let slotWidth = viewWidth - (2 * (edge + slotOffset));

    function vibrateValue(raw) {
        const dir = raw % 2 ? 1 : -1;
        const rotateValue = Math.random();
        return $enableVibration ? dir * rotateValue : 0;
    }

    let container;
    let paperAnimation;
    let shreddedAnimation;
    let dropAnimation;
    let containerHeight = 0;
    let offset;

    $: containerHeight = container ? container.offsetHeight : 0;
    $: offset = window.innerWidth * pageOuterMarginRatio / 100;

    const paperKeyframes = {
        transform: [`translate3d(0, ${pageOuterMarginRatio}vw, 0)`, `translate3d(0, calc(100% + ${pageOuterMarginRatio}vw), 0)`] //`translate3d(0, calc(0% + ${pageOuterMarginRatio}vw), 0)`, 
    }

    const shredKeyFrames = {
        transform: [`translate3d(0, ${-1.5 * pageOuterMarginRatio}vw, 0)`]
    }

    function getPaperDistance() {
        return containerHeight;
    }

    function getShreddedDistance() {
        let base = containerHeight - (1.5 * offset);
        let boxAdjustment = window.innerWidth * .9 * 150 / 1200;
        return mobile ? base + boxAdjustment : base;
    }

    function adjustDuration(duration) {
        const ratio = getPaperDistance() / getShreddedDistance();
        return duration * ratio;
    }

    const shredOptions = {
        delay: mobile ? 3000 : 1000,
        duration: 7500,
        easing: 'linear',
        fill: 'forwards'
    }

    function shred() {
        let paperDuration = adjustDuration(shredOptions.duration);
        let paperOptions = {
            ...shredOptions,
            duration: paperDuration
        }
        debugger;
        console.log(getShreddedDistance() / shredOptions.duration, getPaperDistance() / paperDuration)

        paperAnimation = $paperElement.animate(paperKeyframes, paperOptions);
        shreddedAnimation = $shreddedPaperElement.animate(shredKeyFrames, shredOptions);

        return shreddedAnimation;
    }

    function unshred() {
        dropAnimation.reverse()
        setTimeout(() => {
            paperAnimation.reverse();
            shreddedAnimation.reverse();
        }, dropAnimationOptions.duration - 250);
    }

    const dropAnimationOptions = {
        duration: 1000,
        easing: 'cubic-bezier(0.32, 0, 0.67, 0)',
        fill: 'forwards'
    }

    function drop() {
        return $shreddedPaperElement.animate({
            transform: ['translate3d(0, 150%, 0)'] //`translate3d(0, -${1.5 * pageOuterMarginRatio}vw, 0)`,
        }, dropAnimationOptions);
    }

    function runFullAnimation() {
        shred().finished.then(() => {});
        setTimeout(() => {
            dropAnimation = drop();
            dropAnimation.finished.then(() => {
                $status = statusTypes.letter
            });
        }, shredOptions.delay + shredOptions.duration - 100);
    }

    function scrollIntoView() {
        const boundingBox = target.getBoundingClientRect();
        const boxHeight = boundingBox.bottom - boundingBox.top;
        
        if (window.scrollY < boundingBox.top) {
            window.scrollTo({
                top: boundingBox.top,// - (window.innerHeight / 2) + (boxHeight / 2),
                behavior: 'smooth'
            });
        }
    }

    let target, intersecting;
    onMount(() => {
        const observer = new IntersectionObserver(entries => {
            intersecting = entries[0].isIntersecting;
            if (intersecting && !debug) {
                setTimeout(scrollIntoView, shredOptions.delay + (shredOptions.duration / 2));
                runFullAnimation();
                observer.unobserve(target);
            }
        }, {
            threshold: .5
        });

        observer.observe(target);
    })
</script>

<div class="shredder svg-container" bind:this={$shredderElement}>
    <div class="shredder-view shredder-view-top relative overflow-hidden z-40" class:overflow-visible={debug} bind:this={container}>
        <slot></slot>
    </div>
    
    <div class="shredder-backdrop z-0"></div>
    <div class="shredder-top relative z-30" bind:this={target}>
        <svg viewBox="0 {halfEdge} {viewWidth} {topHeight}">
            <clipPath id="clip-shred-top">
                <rect y={halfEdge} width={viewWidth} height={topHeight + halfEdge} />
            </clipPath>
            <g clip-path="url(#clip-shred-top)">
                <rect class="bg edge-stroke" x={halfEdge} y={edge} width={outsideWidth} height={topHeight + edge} stroke-width={edge}/>
                <line class="edge-stroke" x1={halfEdge + slotOffset} y1={topHeight} x2={edge + halfEdge + slotOffset + slotWidth} y2={topHeight} stroke-width={edge} />
            </g>
        </svg>
    </div>
    <div class="shredder-bottom relative z-50">
        {#if debug}
            <div class="shredder-controls absolute flex justify-between">
                <button class="button control mr-4" on:click={unshred}>Unshred</button>
                <button class="button control" on:click={runFullAnimation}>Shred</button>
            </div>
        {/if}
        <svg class="shredder-bottom z-20" viewBox="0 {halfEdge} {viewWidth} {bottomHeight}">
            <clipPath id="clip-shred-bottom">
                <rect width={slotOffset + (2 * edge)} height={bottomHeight + halfEdge} />
                <rect x={slotOffset + edge} y={slotHeight - halfEdge} width={slotWidth} height={bottomHeight + edge - slotHeight}/>
                <rect x={slotOffset + slotWidth} width={slotOffset + (2 * edge)} height={bottomHeight + halfEdge} />
            </clipPath>
            <g clip-path="url(#clip-shred-bottom)">
                <rect class="bg edge-stroke" x={halfEdge} width={outsideWidth} height={bottomHeight} stroke-width={edge}/>
                <rect class="edge-stroke" x={slotOffset + edge} width={slotWidth} height={slotHeight} stroke-width={edge}/>
            </g>
        </svg>
    </div>
    <div class="shredder-view relative overflow-hidden z-20" class:overflow-visible={debug}>
        <slot name="bottom"></slot>
    </div>
</div>

<style lang="scss">
    .bg {
        fill: var(--bg);
    }

    .edge-stroke {
        stroke: #fff;
    }

    .shredder {
        margin-bottom: 100px;
        transform-style: preserve-3d;
    }

    .shredder-backdrop {
        position: absolute;
        width: 100%;
        height: calc(var(--pageWidth) * 375 / 1200);
        background: #04094a;

        @media (min-width: 640px) {
            height: calc(var(--pageWidth) / 6);
        }

        @media (min-width: 1111px) {
            height: calc(1000px / 6)
        }
    }

    .shredder-view {
        display: flex;
        justify-content: center;
        //overflow: hidden;
    }

    .shredder-view-top {
        margin-bottom: calc(10px - (var(--pageWidth) * 225 / 1200));

        @media (min-width: 640px) {
            margin-bottom: calc(-1 * var(--pageWidth) * 85 / 1200);
        }

        @media (min-width: 1111px) {
            margin-bottom: -71px;
        }
    }

    .shredder-controls {
        right: 10px;
        bottom: -50px;
        @media (min-width: 768px) {
            bottom: 10px;
        }
    }
</style>