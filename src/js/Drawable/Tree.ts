import {IDrawable} from "../Interfaces/IDrawable";
import {settings} from "../settings";
import {Circle} from "./Circle";
import {random2} from "../Helpers/helpers";
import {IAnimate} from "../Interfaces/IAnimate";
import {Canvas} from "./Canvas";


export class Tree implements IDrawable, IAnimate {
    public readonly gameCanvasElement: HTMLCanvasElement;
    private height: number;
    private trunkColor: string;
    public position: { x: number, y: number }
    private verticalStart: number;
    private crownColor: string;
    private trunkWidth: number;
    public circles: Circle[];
    private crownRadius: number;
    public isOutSide: boolean;
    private trees: Tree[];
    private ctx: CanvasRenderingContext2D;
    private speedX: number;


    constructor(gameCanvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D, trees: Tree[]) {
        this.gameCanvasElement = gameCanvasElement;
        this.ctx = ctx;
        this.trees = trees;
        this.speedX = settings.tree.speedX;
        this.height = random2(settings.tree.trunk.height);
        this.trunkColor = settings.tree.trunk.color.update(35, 45, 15, 20).toString();
        this.trunkWidth = random2(settings.tree.trunk.width);
        this.crownColor = settings.tree.crown.color.update(80, 95, 10, 20).toString();
        this.verticalStart = random2(settings.tree.verticalStart);
        this.circles = [];
        this.isOutSide = false;

        const steeps = random2(settings.tree.crown.count);
        this.crownRadius = random2(settings.tree.crown.radius);
        for (let i = 0; i < 2 * Math.PI; i += (2 * Math.PI) / steeps) {
            this.circles.push(new Circle(this.ctx, {
                x: Math.cos(i) * random2(settings.tree.crown.radius),
                y: -this.height + Math.sin(i) * random2(settings.tree.crown.radius) / 2
            }, this.crownRadius));
        }
        this.position = {
            x: this.trees.length < 1 ? settings.tree.horizontalStart : this.trees[this.trees.length - 1].position.x + random2(settings.tree.horizontalGap),
            y: this.gameCanvasElement.height - this.verticalStart
        };
        this.resize();
    }


    draw() {
        this.ctx.save();
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.fillStyle = this.trunkColor;
        this.ctx.beginPath();
        this.ctx.moveTo(-this.trunkWidth / 2, 0);
        this.ctx.quadraticCurveTo(-this.trunkWidth / 4, -this.height / 2, -this.trunkWidth / 2, -this.height);
        this.ctx.lineTo(this.trunkWidth / 2, -this.height);
        this.ctx.quadraticCurveTo(this.trunkWidth / 4, -this.height / 2, this.trunkWidth / 2, 0);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.fillStyle = this.crownColor;
        this.circles.forEach((circle: Circle) => {
            circle.draw();
        });
        this.ctx.restore();
    }


    resize() {
        this.position.y = this.gameCanvasElement.height - this.verticalStart;
    }

    animate() {
        if (this.position.x + this.crownRadius + settings.tree.crown.radius.max < 0) {
            this.isOutSide = true;
        }
        this.position.x -= this.speedX;
        this.draw()
    }

}