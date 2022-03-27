import {Sky} from "./Drawable/Sky";
import {Canvas} from "./Canvas";
import {Hill} from "./Drawable/Hill";
import {settings} from "./settings";
import {Tree} from "./Drawable/Tree";
import {IUpdate} from "./Drawable/IUpdate";
import {Balloon} from "./Drawable/Balloon";

class Main {
    private readonly htmlCanvasElement: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly canvas: Canvas;
    private readonly drawables: IUpdate[];
    private startPositionTree: number;

    constructor() {
        this.htmlCanvasElement = document.getElementById('my-canvas') as HTMLCanvasElement;
        this.ctx = this.htmlCanvasElement.getContext('2d');
        this.drawables = [];
        this.drawables.push(new Sky(this.htmlCanvasElement, this.ctx));
        this.canvas = new Canvas(this.htmlCanvasElement, this.drawables);
        this.startPositionTree = this.htmlCanvasElement.width * settings.tree.horizontalStart;
        settings.hill.hills.forEach((hill) => {
            this.drawables.push(new Hill(
                this.htmlCanvasElement,
                this.ctx,
                hill.amplitude,
                hill.height,
                settings.hill.startPosition + hill.startPosition,
                hill.color
            ))
        });

        for (let i = 0; i < settings.tree.maxCount; i++) {
            this.drawables.push(new Tree(this.htmlCanvasElement, this.ctx, this.startPositionTree));
            const min = this.htmlCanvasElement.width * settings.tree.horizontalGap.min
            const max = this.htmlCanvasElement.width * settings.tree.horizontalGap.max
            this.startPositionTree += min + Math.random() * (max - min);
        }

        this.drawables.push(new Balloon(this.htmlCanvasElement, this.ctx))

        this.canvas.update();
    }
}

new Main()
