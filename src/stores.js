import { fontSize, textAreaWidth, innerMargin } from './settings'
import { writable, readable, derived } from 'svelte/store'
import { tweened } from 'svelte/motion'
import opentype from 'opentype.js'
import { breakTextIntoLines, distributeLinesVertically } from './utils/text-wrapper'

export const paperPosition = tweened(0, {
    duration: 2500
});

export const letterText = writable('Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip. Sea lettuce lettuce water chestnut eggplant winter purslane fennel azuki bean earthnut pea sierra leone bologi leek soko chicory celtuce parsley jícama salsify.')

export const lines = derived(letterText, ($letterText, set) => {
    opentype.load('FiraCode-Regular.ttf', (err, font) => {
        if (err || !$letterText) {
            console.log(err);
            return;
        }

        let lines = breakIntoLines(font, $letterText);
        set(lines);
    });
}, [])

function breakIntoLines(font, text) {
    let path;
    let lines = [];
    let zeroPath = font.getPath('0', 0, 0, fontSize);
    let box = zeroPath.getBoundingBox();
    let textLines = breakTextIntoLines(text, textAreaWidth, box);
    let verticalDistribution = distributeLinesVertically(textLines.length, box, 2, innerMargin);

    textLines.forEach((line, index) => {
        path = font.getPath(line, innerMargin, verticalDistribution[index], fontSize).toPathData(4);
        lines.push(path);
    });

    return lines;
}