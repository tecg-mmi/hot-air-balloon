import {Canvas} from "./Drawable/Canvas";
import {Tree} from "./Drawable/Tree";

export class Animation {
    private canvas: Canvas;
    private requestId: number;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
    }

    animate(reset: () => void) {
        this.canvas.animate();
        if (this.canvas.balloon.gameOver) {
            cancelAnimationFrame(this.requestId);
            reset();
            return;
        }
        this.requestId = requestAnimationFrame(() => {
            this.animate(reset);
        });
    }

    reset() {
        this.canvas.reset()
    }
}