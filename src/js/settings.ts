import {Hsl} from "./Helpers/Hsl";

export const settings = {
    sky: {
        gradient: ['hsl(200, 95%, 33%)', 'hsl(200, 95%, 80%)']
    },
    hill: {
        startPosition: 60,
        hills: [
            {amplitude: 27, color: new Hsl(149, 39, 35), height: 35, startPosition: 120},
            {amplitude: 24, color: new Hsl(149, 39, 45), height: 25, startPosition: 60},
            {amplitude: 8, color: new Hsl(149, 39, 55), height: 30, startPosition: 0},
        ]
    },
    tree: {
        trunk: {
            color: new Hsl(345, 60, 11),
            width: {min: 25, max: 45},
            height: {min: 120, max: 200},
        },
        crown: {
            color: new Hsl(154, 90, 11),
            radius: {min: 25, max: 35},
            count: {min: 8, max: 12},
        },
        maxCount: 5,
        verticalStart: {min: 0, max: 30},
        horizontalStart: 1 / 3,
        horizontalGap: {min: 1 / 6, max: 1 / 3}
    },
    Balloon: {
        startPosition: {x: 120, y: 50},
        border: {
            color: 'hsl(45, 75%, 60%)',
            dimensions: {
                width: 60,
                height: 10,
            }

        },
        basket: {
            color: 'hsl(45, 60%, 75%)',
            dimensions: {
                width: 60,
                height: 30,
            }
        },
        cable: {
            color: 'hsl(45, 75%, 60%)',
            spaceFromBorder: 6,
            dimensions: {
                width: 2,
                height: 30,
            }
        },
        balloon: {
            color: 'hsl(45, 90%, 50%)',
            radius: 80,
            controlPointY: 120,
            verticalStretch: 0
        },
    }
}
