<script>
    import { viewWidth, viewHeight } from '../settings'

    let topHeight = 50;

</script>

<div class="shredder">
    <div class="shredder-view">
        <slot name="top"></slot>
    </div>
    <svg class="shredder-top" viewBox="0 0 {viewWidth} {topHeight}">
        <clipPath id="clip-shred-top">
            <rect width={viewWidth} height={topHeight - 5} />
        </clipPath>
        <g clip-path="url(#clip-shred-top)">
            <rect class="bg edge-stroke" x="1" width={viewWidth - 2} height={topHeight} />
        </g>
    </svg>
    <svg class="shredder-bottom">
    
    </svg>
    <div class="shredder-view">
        <slot name="bottom"></slot>
    </div>
</div>

<style>
    .bg {
        fill: var(--bg);
    }

    .edge-stroke {
        stroke-width: 1px;
        stroke: #fff;
    }
</style>