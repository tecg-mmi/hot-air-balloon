import {Hsl} from "./Helpers/Hsl";

export const settings = {
    sky: {
        gradient: ['hsl(200, 95%, 33%)', 'hsl(200, 95%, 80%)']
    },
    hill: {
        startPosition: 60,
        hills: [
            {amplitude: 18, color: new Hsl(149, 39, 35), height: 35, startPosition: 160},
            {amplitude: 13, color: new Hsl(149, 39, 45), height: 45, startPosition: 90},
            {amplitude: 3, color: new Hsl(149, 39, 55), height: 80, startPosition: 0},
        ]
    },
    tree: {
        trunk: {
            color: new Hsl(345, 60, 11),
            width: {min: 25, max: 43},
            height: {min: 125, max: 300},
        },
        crown: {
            color: new Hsl(154, 90, 11),
            radius: {min: 25, max: 35},
            count: {min: 6, max: 12},
        },
        maxCount: 5,
        verticalStart: {min: 0, max: 60},
        horizontalStart: 1 / 3,
        horizontalGap: {min: 1 / 6, max: 1 / 3},
        speedX: 2
    },
    Balloon: {
        velocity: {x: 0, y: 0},
        maxVelocity:5,
        velocityHeating: 0.4,
        velocityCooling: 0.4,
        velocityHorizontal: 0.2,
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
    },
    canvas: {
        id: 'my-canvas',
        CanvasRenderingContext: '2d'
    }
}
