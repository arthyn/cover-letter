function getCharacterWidth(box) {
    return box.x2 - box.x1;
}

function getCharacterHeight(box) {
    return box.y2 - box.y1;
}

function getTextLine(testWords, maxCharacters) {
    const newLineRegex = /(.*)([\n|\r]+)(.*)/;
    let remainingWords = testWords.slice();
    let allowedWords = [];
    let characterSum = 0;
    let insertNewLine = false;
    let word, newLineMatch;

    while (remainingWords.length > 0 && characterSum - 1 < maxCharacters) {
        debugger;
        word = remainingWords.shift();
        newLineMatch = word.match(newLineRegex);
        if (newLineMatch) {
            remainingWords.unshift(newLineMatch[3]);

            if (newLineMatch[1].length + characterSum < maxCharacters) {
                allowedWords.push(newLineMatch[1]);
                if (newLineMatch[2].match(/[\n|\r\n]/g).length > 1) {
                    insertNewLine = true;
                }
            } else {
                remainingWords.unshift(newLineMatch[1] + newLineMatch[2]);
            }
            
            break;
        }

        characterSum += word.length + 1;

        if (characterSum - 1 < maxCharacters) {
            allowedWords.push(word);
        } else {
            remainingWords.unshift(word);
        }
    }

    return {
        allowedWords,
        remainingWords,
        newLine: insertNewLine
    }
}

export function breakTextIntoLines(text, textAreaWidth, zeroBoundingBox) {
    const realWidth = getCharacterWidth(zeroBoundingBox) * 1.3;
    const maxCharacters = Math.floor(textAreaWidth / realWidth);
    let words = text.trim().split(' ');
    let lineData;
    let lines = [];

    while (words.length > 0) {
        lineData = getTextLine(words, maxCharacters);
        lines.push(lineData.allowedWords.join(' '));
        words = lineData.remainingWords;

        if (lineData.newLine) {
            lines.push(' ');
        }
    }

    return lines;
}

export function distributeLinesVertically(lineCount, zeroBoundingBox, lineHeightRatio, startingOffset) {
    const charHeight = getCharacterHeight(zeroBoundingBox);
    const lineHeight = charHeight * lineHeightRatio;
    const offsets = [];
    let currentOffset = startingOffset;

    for (let i=1; i<=lineCount; i++) {
        currentOffset += lineHeight;
        offsets.push(currentOffset);
    }

    return offsets;
}