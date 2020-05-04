export const debug = false;

export const getSettings = (windowWidth) => {
    const mobile = 640;
    const max = 1111;
    const viewWidth = 1200;
    const viewHeight = windowWidth < mobile ? 1800 : 1200;
    const outerMargin = windowWidth < mobile ? 50 : 100;
    const innerMargin = outerMargin + 75;
    const pageWidth = viewWidth - (2 * outerMargin);
    const pageHeight = viewHeight - (2 * outerMargin);
    const textAreaWidth = viewWidth - (2 * innerMargin);
    const pageOuterMarginRatio = 100 * outerMargin / viewWidth;
    const pageOuterMarginPixels = outerMargin / viewWidth * windowWidth;
    const fontSize = windowWidth < mobile ? 30 : 21;
    const shredderWidth = 90;

    return {
        debug,
        mobile,
        max,
        viewWidth,
        viewHeight,
        outerMargin,
        innerMargin,
        pageWidth,
        pageHeight,
        textAreaWidth,
        pageOuterMarginRatio,
        pageOuterMarginPixels,
        fontSize,
        shredderWidth
    }
}