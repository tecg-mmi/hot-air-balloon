import {Sky} from "./Sky";
import {settings} from "../settings";
import {Hill} from "./Hill";
import {Tree} from "./Tree";
import {Balloon} from "./Balloon";
import {Fuel} from "./Fuel";
import {IDrawable} from "../Interfaces/IDrawable";

export class Canvas implements IDrawable {
    public readonly backgroundCanvasElement: HTMLCanvasElement;
    public readonly gameCanvasElement: HTMLCanvasElement;
    public trees: Tree[];
    private hills: Hill[];
    private readonly startPositionTree: number;
    private readonly sky: Sky;
    public readonly balloon: Balloon;
    private backgroundCtx: CanvasRenderingContext2D;
    public gameCtx: CanvasRenderingContext2D;

    constructor() {
        this.backgroundCanvasElement = document.getElementById(settings.canvas.background) as HTMLCanvasElement;
        this.backgroundCtx = this.backgroundCanvasElement.getContext(settings.canvas.CanvasRenderingContext) as CanvasRenderingContext2D;
        this.gameCanvasElement = document.getElementById(settings.canvas.game) as HTMLCanvasElement;
        this.gameCtx = this.gameCanvasElement.getContext(settings.canvas.CanvasRenderingContext) as CanvasRenderingContext2D;
        this.trees = [];
        this.hills = [];
        this.resize();
        this.sky = new Sky(this.backgroundCanvasElement, this.backgroundCtx);
        this.startPositionTree = settings.tree.horizontalStart;
        settings.hill.hills.forEach((hill) => {
            this.hills.push(new Hill(
                this.backgroundCanvasElement,
                this.backgroundCtx,
                hill.amplitude,
                hill.height,
                settings.hill.startPosition + hill.startPosition,
                hill.color,
                hill.withFir
            ))
        });
        for (let i = 0; i < settings.tree.maxCount; i++) {
            if (this.startPositionTree + settings.tree.horizontalGap.max + settings.tree.crown.radius.max >= this.backgroundCanvasElement.width) {
                //break;
            }
            this.trees.push(new Tree(this.gameCanvasElement, this.gameCtx, this.trees));
        }
        this.balloon = new Balloon(this.gameCanvasElement, this.gameCtx, this.trees);
        this.addEventListeners();
        this.draw();
    }

    resize() {
        this.backgroundCanvasElement.width = window.innerWidth;
        this.backgroundCanvasElement.height = window.innerHeight;
        this.gameCanvasElement.width = window.innerWidth;
        this.gameCanvasElement.height = window.innerHeight;
        this.sky?.resize();
        this.hills.forEach((hill: Hill) => {
            hill.resize();
        });
        this.trees.forEach((tree: Tree) => {
            tree.resize();
        });
        this.balloon?.resize();
    }

    draw() {
        this.sky?.draw();
        this.hills.forEach((hill: Hill) => {
            hill.draw();
        });
        this.trees.forEach((tree: Tree) => {
            tree.draw();
        });
        this.balloon?.draw();
    }

    animate() {
        if (this.trees.filter((tree: Tree) => tree.isOutSide).length > 0) {
            if (Math.random() * 10 % 3) {
                this.trees.push(new Tree(this.gameCanvasElement, this.gameCtx, this.trees))
            }
        }
        this.clear();
        this.trees.forEach((tree: Tree) => {
            tree.animate();
        });
        this.balloon?.animate();
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.draw();
        });
    }

    clear() {
        this.gameCtx.clearRect(0, 0, this.backgroundCanvasElement.width, this.backgroundCanvasElement.height);
    }
}