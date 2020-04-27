<script>
    import { viewWidth, viewHeight } from '../settings'
    import { paperPosition, vibrationRawValue } from '../stores'

    let topHeight = 50;
    let bottomHeight = 150;
    let edge = 2;
    let outsideWidth = viewWidth - (2 * edge);
    let slotOffset = 50;
    let slotWidth = viewWidth - (2 * (edge + slotOffset))
    let vibrations = false;

    function vibrateValue(raw) {
        if (!vibrations)
            return 0;

        console.log(raw)
        const dir = raw % 2 ? 1 : -1;
        const rotateValue = Math.random();
        return dir * rotateValue;
    }

    function shred() {
        paperPosition.set(150);
    }
</script>

<div class="shredder">
    <div class="shredder-view shredder-view-top relative z-40">
        <slot name="top"></slot>
    </div>
    <!-- style="transform: rotate({vibrateValue($vibrationRawValue)}deg)" -->
    <div class="shredder-body relative">
        <svg class="shredder-top z-30" viewBox="0 0 {viewWidth} {topHeight}">
            <clipPath id="clip-shred-top">
                <rect width={viewWidth} height={topHeight - 5} />
            </clipPath>
            <g clip-path="url(#clip-shred-top)">
                <rect class="bg edge-stroke" x="1" width={outsideWidth} height={topHeight} stroke-width={edge}/>
                <line class="edge-stroke" x1={edge + slotOffset} y1={topHeight - 5} x2={edge + slotOffset + slotWidth} y2={topHeight - 5} stroke-width={edge} />
            </g>
        </svg>
        <svg class="shredder-bottom z-20" viewBox="0 0 {viewWidth} {bottomHeight}">
            <clipPath id="clip-shred-bottom">
                <rect y="5" x="0" width={slotOffset + (2 * edge)} height={bottomHeight - 5} />
                <rect x={slotOffset + edge} y="55" width={slotWidth} height={bottomHeight - 55} />
                <rect y="5" x={slotOffset + slotWidth} width={slotOffset + (2 * edge)} height={bottomHeight - 5} />
            </clipPath>
            <g clip-path="url(#clip-shred-bottom)">
                <rect class="bg edge-stroke" x="1" width={outsideWidth} height={bottomHeight} stroke-width={edge}/>
                <rect class="edge-stroke" x={slotOffset + edge} y="5" width={slotWidth} height="50" stroke-width={edge}/>
            </g>
        </svg>
        <button class="z-50" on:click={shred}>Shred</button>
    </div>
    <div class="shredder-view relative z-10">
        <slot name="bottom"></slot>
    </div>
</div>

<style>
    .bg {
        fill: var(--bg);
    }

    .edge-stroke {
        stroke: #fff;
    }

    .shredder {
        width: var(--pageWidth);
        margin-bottom: 100px;
    }

    .shredder-top,
    .shredder-bottom {
        position: absolute;
    }

    .shredder-top {
        bottom: -5px;
    }

    .shredder-bottom {
        top: -5px;
        background: #04094a;
    }

    .shredder-view {
        display: flex;
        justify-content: center;
        overflow: hidden;
    }

    .shredder-view-top {
        margin-bottom: -45px;
    }

    .shredder-body {
        transition: transform .05 ease;
    }

    button {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: var(--primary);
        background: var(--bg);
        border: 1px solid var(--primary);
        transform: translate3d(0,0,0)
    }
</style>