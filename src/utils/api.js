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

export function generateTemplateLetter(job, company) {
    return `
Dear Mr. or Mrs,

This letter is to express my interest in the ${job} position at ${company}. With software development, there is always something new to discover. Designing a program that is truly helpful to the user is my ultimate goal on every project, and I am delighted by the opportunity to apply my knowledge at ${company}. 

During my previous role at Big Corp, Inc, I was integral in the development of their main consumer facing site. I was successful in building multiple systems which handle their customers' needs. As part of my duties, I provided enhancements to the program and also provided immediate solutions to unexpected problems.

Your listed requirements closely match to my background and skills. A few I would like to highlight that would enable me to contribute to your bottom line are:

    • I am a 10x developer
    • Highly skilled in designing, testing and developing software
    • Knowledgeable and always follows best practices
    • Complete master of Javascript (don't ask me about CSS or HTML)

I am confident I will be an asset to your organization. Thank you for your time and consideration. I'm looking forward to learning more about the ${job} position and about ${company}. 
`;
}