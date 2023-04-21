import {Animatable} from "./Types/Animatable";
import {Canvas} from "./Canvas";

export class Animate {
    private animated: Animatable[];
    private canvas: Canvas;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.animated = [];
    }

    public start() {
        this.animate()
    }

    public registerForAnimation(animated: Animatable) {
        this.animated.push(animated);
    }

    private animate() {
        this.canvas.clear();
        this.animated.forEach((animate) => {
            animate.update();
            animate.draw();
        });
        requestAnimationFrame(this.animate.bind(this));
    }
}