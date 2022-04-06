import {Sky} from "./Sky";
import {settings} from "../settings";
import {Hill} from "./Hill";
import {Tree} from "./Tree";
import {Balloon} from "./Balloon";

export class Canvas {
    public readonly htmlCanvasElement: HTMLCanvasElement;
    public trees: Tree[];
    private hills: Hill[];
    public readonly ctx: CanvasRenderingContext2D;
    private readonly startPositionTree: number;
    private readonly sky: Sky;
    public readonly balloon: Balloon;

    constructor() {
        this.htmlCanvasElement = document.getElementById(settings.canvas.id) as HTMLCanvasElement;
        this.ctx = this.htmlCanvasElement.getContext(settings.canvas.CanvasRenderingContext) as CanvasRenderingContext2D;
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
                hill.color,
                hill.withFir
            ))
        });
        for (let i = 0; i < settings.tree.maxCount; i++) {
            if (this.startPositionTree + settings.tree.horizontalGap.max + settings.tree.crown.radius.max >= this.htmlCanvasElement.width) {
                //break;
            }
            this.trees.push(new Tree(this));
        }
        this.balloon = new Balloon(this);
        this.addEventListeners();
        this.draw();
    }

    update() {
        this.htmlCanvasElement.width = window.innerWidth;
        this.htmlCanvasElement.height = window.innerHeight;
        this.sky?.update();
        this.hills.forEach((hill: Hill) => {
            hill.update();
        });
        this.trees.forEach((tree: Tree) => {
            tree.update();
        });
        this.balloon?.update();
        this.draw();
    }

    draw() {
        this.clear();
        this.sky?.draw();
        this.hills.forEach((hill: Hill) => {
            hill.draw();
        });
        this.trees.forEach((tree: Tree) => {
            tree.draw();
        });
        this.balloon?.draw();
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