import throttle from 'lodash.throttle';
import { getSettings, debug } from './settings'
import { writable, readable, derived } from 'svelte/store'
import opentype from 'opentype.js'
import { generateTemplateLetter } from './api'
import { breakTextIntoLines, distributeLinesVertically } from './text-wrapper'

export const statusTypes = {
    intro: 'intro',
    shredder: 'shredder',
    letter: 'letter'
}

export const status = writable(statusTypes.intro);
export const animate = writable(false);

export const theirName = writable(debug ? 'Hunter' : '');

export const paperDistance = writable();
export const shreddedPaperDistance = writable();

export const windowWidth = readable(window.innerWidth, set => {
    const setWidth = throttle(() => set(window.innerWidth), 50);
    window.addEventListener('resize', setWidth);

    return () => window.removeEventListener('resize', setWidth);
});

export const settings = derived(windowWidth, ($windowWidth) => getSettings($windowWidth));

export const letterText = writable(generateTemplateLetter('Software Developer', 'Modern Digital'))

export const lines = derived([letterText, settings], ([$letterText, $settings], set) => {
    opentype.load('FiraCode-Regular-subset.zopfli.woff', (err, font) => {
        if (err || !$letterText) {
            console.log(err);
            return;
        }

        let lines = breakIntoLines(font, $letterText, $settings);
        set(lines);
    });
}, [])

function breakIntoLines(font, text, settings) {
    let { fontSize, textAreaWidth, innerMargin } = settings;
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
