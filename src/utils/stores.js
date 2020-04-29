import { fontSize, textAreaWidth, innerMargin } from './settings'
import { writable, readable, derived } from 'svelte/store'
import { tweened } from 'svelte/motion'
import opentype from 'opentype.js'
import { generateTemplateLetter } from './api'
import { breakTextIntoLines, distributeLinesVertically } from './text-wrapper'

export const shredderElement = writable();
export const paperElement = writable();
export const shreddedPaperElement = writable();

export const paperPosition = writable(0);

export const letterText = writable(generateTemplateLetter('Software Developer', 'Modern Digital'))

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

export const enableVibration = writable(false);

// let vibration = 0;
// export const vibrationRawValue = readable(0, set => {
//     const interval = setInterval(() => {
//         set(++vibration);
//     }, 50);

//     return () => clearInterval(interval);
// });
