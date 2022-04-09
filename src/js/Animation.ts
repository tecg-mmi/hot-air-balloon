import {Canvas} from "./Drawable/Canvas";
import {Tree} from "./Drawable/Tree";

export class Animation {
    private canvas: Canvas;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
    }

    animate() {
        this.canvas.animate();
        if (this.canvas.balloon.hitTree) {
            return
        }
        requestAnimationFrame(() => {
            this.animate();
        });
    }
}