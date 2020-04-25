<script>
    import Warp from 'warpjs';
    import opentype from 'opentype.js';
    import { breakTextIntoLines, distributeLinesVertically } from './text-wrapper';

    export let stripCount = 5;

    let text = 'Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip. Sea lettuce lettuce water chestnut eggplant winter purslane fennel azuki bean earthnut pea sierra leone bologi leek soko chicory celtuce parsley jícama salsify.';
    let strips = [];
    let viewWidth = 1200;
    let viewHeight = 600;
    let outerMargin = 100;
    let innerMargin = outerMargin + 75;
    let textAreaWidth = viewWidth - (2 * innerMargin);
    let fontSize = 24;

    let maxWidth = viewWidth - (2 * outerMargin);
    let width = maxWidth / stripCount;
    let height = viewHeight * 2;
    let lines = [];

    let stripTemplate = {
        x: 0,
        y: outerMargin,
        height,
        width
    }

    $: {
        opentype.load('FiraCode-Regular.ttf', (err, font) => {
            if (err || !text) {
                console.log(err);
                return;
            }

            let zeroPath = font.getPath('0', 0, 0, fontSize);
            let box = zeroPath.getBoundingBox();
            let textLines = breakTextIntoLines(text, textAreaWidth, box);
            let verticalDistribution = distributeLinesVertically(textLines.length, box, 2, innerMargin);
            let path;
            lines = [];

            textLines.forEach((line, index) => {
                path = font.getPath(line, innerMargin, verticalDistribution[index], fontSize).toPathData(4);
                lines = [...lines, path];
            });
        });
    }

    $: {
        strips = []
        for(let i=0; i<stripCount; i++) {
            strips.push({
               ...stripTemplate,
               x: (i * width) + outerMargin
            })
        }
    }
</script>

<main>
    <div class="page">
        {#each strips as strip}
            <svg class="strip-container" viewBox="0 0 {viewWidth} {viewHeight}">
                <clipPath id={'clip-' + strip.x}>
                    <rect x={strip.x} y={strip.y} height={strip.height} width={strip.width}></rect>
                </clipPath>
                <g id={'strip-' + strip.x} clip-path="url(#{'clip-' + strip.x})">
                    <rect class="strip" x={strip.x} y={strip.y} height={strip.height} width={strip.width}></rect>
                    {#each lines as line}
                        <path d={line} />
                    {/each}
                </g>
            </svg>
        {/each}
    </div>

    <textarea class="input-box" bind:value={text}></textarea>
</main>

<style>
    main {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
    }

    .page,
    .strip-container {
        width: 1200px;
        height: 600px;
    }

    .page {
        position: relative;
        margin-bottom: 50px;
        border: 1px solid #fff;    
    }

    .strip-container {
        position: absolute;
        top: 0;
        left: 0;
    }

    .strip {
        fill: #fff;
    }

    .input-box {
        width: 600px;
        height: 200px;
        color: #fff;
        background: transparent;
        border: 1px solid #fff;
    }
</style>