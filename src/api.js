import Warp from 'warpjs';

function shredderTopWarp(element) {
    const warp = new Warp(element);

    warp.interpolate(4)
    warp.transform(([ x, y ]) => [ x, y + 4 * Math.sin(x / 16) ])
}

function shredderBottomWarp(element, params) {
    const warp = new Warp(element);

    warp.interpolate(4);
    warp.transform(([x, y]) => {
        const advancedX = (y/16) + (y/(32 + (params.wiggleAmplitude)) * Math.sin(y/72 + (144 * params.wiggleLength)));
        //console.log(y, advancedX);
        return [(params.multiplier * advancedX) + x, y]
    })
}

export function applyTopWarp(node, params) {
    //debugger
    return {
        update(params) {
            if (!params.warp)
                return;

            //console.log('warping!');
            shredderBottomWarp(node, params);
        }
    }
}