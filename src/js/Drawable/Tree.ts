import {IDrawable} from "../Interfaces/IDrawable";
import {settings} from "../settings";
import {Circle} from "./Circle";
import {random2} from "../Helpers/helpers";
import {IAnimate} from "../Interfaces/IAnimate";


export class Tree implements IDrawable, IAnimate {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly height: number;
    private readonly trunkColor: string;
    private position: { x: number, y: number }
    private readonly startPosition: number;
    private readonly verticalStart: number;
    private readonly crownColor: string;
    private readonly trunkWidth: number;
    private circles: Circle[];


    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, startPosition: number) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.height = settings.tree.trunk.height.min + Math.random() * (settings.tree.trunk.height.max - settings.tree.trunk.height.min);
        this.trunkColor = settings.tree.trunk.color.update(35, 45, 15, 20).toString();
        this.trunkWidth = settings.tree.trunk.width.min + Math.random() * (settings.tree.trunk.width.max - settings.tree.trunk.width.min);
        this.crownColor = settings.tree.crown.color.update(80, 95, 10, 20).toString();
        this.startPosition = startPosition;
        this.verticalStart = (settings.tree.verticalStart.min + Math.random() * (settings.tree.verticalStart.max - settings.tree.verticalStart.min));
        this.circles = [];

        const steeps = Math.trunc(random2(settings.tree.crown.count));
        const radius = Math.trunc(random2(settings.tree.crown.radius));
        for (let i = 0; i < 2 * Math.PI; i += (2 * Math.PI) / steeps) {
            this.circles.push(new Circle(this.ctx, {
                x: Math.cos(i) * random2(settings.tree.crown.radius),
                y: -this.height + Math.sin(i) * random2(settings.tree.crown.radius) / 2
            }, radius));
        }

        this.update();
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


    update() {
        this.position = {
            x: this.startPosition,
            y: this.canvas.height - this.verticalStart
        };
    }

    animate() {
        this.position.x -= 8;
    }

}