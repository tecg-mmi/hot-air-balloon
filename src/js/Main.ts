import {Canvas} from "./Drawable/Canvas";
import {Animation} from "./Animation";

class Main {
    private readonly canvas: Canvas;
    private animation: Animation;

    constructor() {
        this.canvas = new Canvas();
        this.animation = new Animation(this.canvas);
    }
}

new Main();
