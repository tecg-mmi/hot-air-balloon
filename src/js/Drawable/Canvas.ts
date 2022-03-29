import {IDrawable} from "../Interfaces/IDrawable";
import {Sky} from "./Sky";
import {settings} from "../settings";
import {Hill} from "./Hill";
import {Tree} from "./Tree";
import {Balloon} from "./Balloon";

export class Canvas {
    private readonly htmlCanvasElement: HTMLCanvasElement;
    private drawables: IDrawable[];
    public trees: Tree[];
    private hills: Hill[];
    private readonly ctx: CanvasRenderingContext2D;
    private readonly startPositionTree: number;
    private readonly sky: Sky;
    public readonly balloon: Balloon;

    constructor() {
        this.htmlCanvasElement = document.getElementById(settings.canvas.id) as HTMLCanvasElement;
        this.ctx = this.htmlCanvasElement.getContext(settings.canvas.CanvasRenderingContext) as CanvasRenderingContext2D;
        this.drawables = [];
        this.trees = [];
        this.hills = [];
        this.update();
        this.sky = new Sky(this.htmlCanvasElement, this.ctx);
        this.startPositionTree = this.htmlCanvasElement.width * settings.tree.horizontalStart;
        settings.hill.hills.forEach((hill) => {
            this.hills.push(new Hill(
                this.htmlCanvasElement,
                this.ctx,
                hill.amplitude,
                hill.height,
                settings.hill.startPosition + hill.startPosition,
                hill.color
            ))
        });
        for (let i = 0; i < settings.tree.maxCount; i++) {
            this.trees.push(new Tree(this.htmlCanvasElement, this.ctx, this.startPositionTree))
            const min = this.htmlCanvasElement.width * settings.tree.horizontalGap.min
            const max = this.htmlCanvasElement.width * settings.tree.horizontalGap.max
            this.startPositionTree += min + Math.random() * (max - min);
        }
        this.balloon = new Balloon(this.htmlCanvasElement, this.ctx);
        this.addEventListeners();
        this.loadDrawable();
        this.draw();
    }

    loadDrawable() {
        this.drawables.push(this.sky);
        this.hills.forEach((hill: Hill) => {
            this.drawables.push(hill);
        });
        this.trees.forEach((tree: Tree) => {
            this.drawables.push(tree);
        });
        this.drawables.push(this.balloon);
    }

    update() {
        this.htmlCanvasElement.width = window.innerWidth;
        this.htmlCanvasElement.height = window.innerHeight;
        this.drawables.forEach((drawable: IDrawable) => {
            drawable.update();
            drawable.draw();
        });
    }

    draw() {
        this.clear();
        this.drawables.forEach((drawable: IDrawable) => {
            drawable.draw();
        });
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.update();
        });
    }

    clear() {
        this.ctx.clearRect(0, 0, this.htmlCanvasElement.width, this.htmlCanvasElement.height);
    }
}