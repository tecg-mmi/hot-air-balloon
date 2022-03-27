import {IUpdate} from "./Drawable/IUpdate";

export class Canvas implements IUpdate {
    private readonly canvas: HTMLCanvasElement;
    private drawables: IUpdate[];

    constructor(canvas: HTMLCanvasElement, drawables: IUpdate[]) {
        this.canvas = canvas;
        this.drawables = drawables;
        this.addEventListeners();
        this.update();
    }

    update() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.drawables.forEach((drawable: IUpdate) => {
            drawable.update();
        });
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.update();
        });
    }
}