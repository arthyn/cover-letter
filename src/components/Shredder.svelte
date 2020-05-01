<script>
    import { viewWidth, viewHeight, pageOuterMarginRatio } from '../utils/settings'
    import { paperPosition, enableVibration, shredderElement, paperElement, shreddedPaperElement } from '../utils/stores'

    let topHeight = 50;
    let bottomHeight = 150;
    let edge = 4;
    let halfEdge = edge / 2;
    let outsideWidth = viewWidth - edge;
    let slotOffset = 50;
    let slotHeight = 50;
    let slotWidth = viewWidth - (2 * (edge + slotOffset));

    function vibrateValue(raw) {
        const dir = raw % 2 ? 1 : -1;
        const rotateValue = Math.random();
        return $enableVibration ? dir * rotateValue : 0;
    }

    let paperAnimation;
    const paperKeyframes = {
        transform: [`translate3d(0, calc(0% + ${pageOuterMarginRatio}vw), 0)`, `translate3d(0, calc(250% + ${pageOuterMarginRatio}vw), 0)`]
    };

    let shreddedAnimation;
    const shreddedKeyframes = {
        transform: ['translate3d(0, -100%, 0)', 'translate3d(0, 150%, 0)']
    }

    const shredAnimationOptions = {
        duration: 2500,
        easing: 'linear',
        fill: 'forwards'
    }

    function shred() {
        paperAnimation = $paperElement.animate(paperKeyframes, shredAnimationOptions);
        shreddedAnimation = $shreddedPaperElement.animate(shreddedKeyframes, shredAnimationOptions);
    }

    function unshred() {
        paperAnimation.reverse();
        shreddedAnimation.reverse();
    }
</script>


<!-- style="transform: rotate({vibrateValue($vibrationRawValue)}deg)" -->
<div class="shredder svg-container" bind:this={$shredderElement}>
    <div class="shredder-view shredder-view-top relative z-40">
        <slot name="top"></slot>
    </div>
    <div class="shredder-backdrop z-0"></div>
    <div class="shredder-top relative z-30">
        <svg viewBox="0 {halfEdge} {viewWidth} {topHeight}">
            <clipPath id="clip-shred-top">
                <rect y={halfEdge} width={viewWidth} height={topHeight + halfEdge} />
            </clipPath>
            <g clip-path="url(#clip-shred-top)">
                <rect class="bg edge-stroke" x="1" y={halfEdge} width={outsideWidth} height={topHeight + halfEdge} stroke-width={edge}/>
                <line class="edge-stroke" x1={halfEdge + slotOffset} y1={topHeight + halfEdge} x2={edge + halfEdge + slotOffset + slotWidth} y2={topHeight + halfEdge} stroke-width={edge} />
            </g>
        </svg>
    </div>
    <div class="shredder-bottom relative z-50">
        <div class="shredder-controls absolute flex justify-between">
            <button class="button control mr-4" on:click={unshred}>Unshred</button>
            <button class="button control" on:click={shred}>Shred</button>
        </div>
        <svg class="shredder-bottom z-20" viewBox="0 {halfEdge} {viewWidth} {bottomHeight}">
            <clipPath id="clip-shred-bottom">
                <rect width={slotOffset + (2 * edge)} height={bottomHeight + halfEdge} />
                <rect x={slotOffset + edge} y={slotHeight - halfEdge} width={slotWidth} height={bottomHeight + edge - slotHeight}/>
                <rect x={slotOffset + slotWidth} width={slotOffset + (2 * edge)} height={bottomHeight + halfEdge} />
            </clipPath>
            <g clip-path="url(#clip-shred-bottom)">
                <rect class="bg edge-stroke" x="1" width={outsideWidth} height={bottomHeight + halfEdge} stroke-width={edge}/>
                <rect class="edge-stroke" x={slotOffset + edge} width={slotWidth} height={slotHeight} stroke-width={edge}/>
            </g>
        </svg>
    </div>
    <div class="shredder-view relative z-20">
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
        height: calc(var(--pageWidth) / 12);
        background: #04094a;
    }

    .shredder-view {
        display: flex;
        justify-content: center;
        overflow: hidden;
    }

    .shredder-view-top {
        margin-bottom: calc(10px - (var(--pageWidth) / 12));
    }

    .shredder-controls {
        right: 10px;
        bottom: -50px;
        @media (min-width: 768px) {
            bottom: 10px;
        }
    }
</style>