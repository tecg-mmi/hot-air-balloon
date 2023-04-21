import {Canvas} from "./Drawable/Canvas";
import {Animation} from "./Animation";
import {GameController} from "./GameController";
import {IDrawable} from "./Interfaces/IDrawable";

class Main {
    private readonly canvas: Canvas;
    private animation: Animation;
    private game: GameController;

    constructor() {
        this.canvas = new Canvas();
        this.animation = new Animation(this.canvas);
        this.game = new GameController(this.animation,this.canvas.balloon);
    }
}

new Main();
