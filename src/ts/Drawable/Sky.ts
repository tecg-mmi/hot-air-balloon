import {Animatable} from "../framework-2023/Types/Animatable";
import {Rectangle} from "../framework-2023/shapes/Rectangle";
import {Canvas} from "../framework-2023/Canvas";
import {Hsl} from "../framework-2023/Colors/Hsl";
import {settings} from "../settings";

export class Sky extends Rectangle implements Animatable {
    constructor(canvas: Canvas, color: Hsl) {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            position: {x: 0, y: 0},
            canvas: canvas,
            color: color,
            direction: Math.PI * 2,
            speed: 0
        });
    }

    draw(): this {
        return super.draw();
    }

    update() {
        super.update();
    }
}