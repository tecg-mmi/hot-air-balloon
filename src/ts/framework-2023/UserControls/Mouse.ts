import {Circle} from "../shapes/Circle";
import {IMouse} from "../Types/IMouse";

export class Mouse extends Circle {
    constructor(mouse: IMouse) {
        super({
            position: {x: 0, y: 0},
            color: mouse.color,
            canvas: mouse.canvas,
            radius: mouse.radius,
        });
        this.canvas.canvasElement.addEventListener('mousemove', (event: MouseEvent) => {
            this.position.x = event.offsetX;
            this.position.y = event.offsetY;
        });
    }

    update() {
        //
    }

}