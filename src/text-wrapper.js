function getCharacterWidth(box) {
    return box.x2 - box.x1;
}

function getCharacterHeight(box) {
    return box.y2 - box.y1;
}

function getTextLine(testWords, maxCharacters) {
    let words = testWords.slice();
    let word = words.shift();
    let allowedWords = [];
    let characterSum = word.length;

    while (words.length > 0 && characterSum - 1 < maxCharacters) {
        allowedWords.push(word);
        word = words.shift();
        characterSum += word.length + 1;
    }

    return {
        allowedWords,
        remainingWords: words
    }
}

export function breakTextIntoLines(text, textAreaWidth, zeroBoundingBox) {
    const realWidth = getCharacterWidth(zeroBoundingBox) * 1.3;
    const maxCharacters = Math.floor(textAreaWidth / realWidth);
    let words = text.split(' ');
    let line;
    let lines = [];

    while (words.length > 0) {
        line = getTextLine(words, maxCharacters);
        lines.push(line.allowedWords.join(' '));
        words = line.remainingWords;
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