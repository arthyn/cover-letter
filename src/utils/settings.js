export const debug = false;

export const mobile = window.innerWidth < 640;

export const viewWidth = 1200;
export const viewHeight = mobile ? 1800 : 1200;

export const outerMargin = mobile ? 50 : 100;
export const innerMargin = outerMargin + 75;

export const pageWidth = viewWidth - (2 * outerMargin);
export const textAreaWidth = viewWidth - (2 * innerMargin);
export const pageOuterMarginRatio = 100 * outerMargin / viewWidth;

export const pageHeight = viewHeight - (2 * outerMargin);

export const fontSize = mobile ? 30 : 21;

export const shredderWidth = 90;