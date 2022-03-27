import {IUpdate} from "./IUpdate";
import {settings} from "../settings";
import {random, random2} from "../Helpers/helpers";

export class Tree implements IUpdate {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly height: number;
    private readonly color: string;
    private readonly position: { x: number, y: number }
    private readonly startPosition: number;
    private readonly verticalStart: number;
    private readonly crownColor: string;
    private readonly width: number;


    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, startPosition: number) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.height = settings.tree.trunk.height.min + Math.random() * (settings.tree.trunk.height.max - settings.tree.trunk.height.min);
        this.color = settings.tree.trunk.color.update(35, 45, 15, 20).toString();
        this.width = settings.tree.trunk.width.min + Math.random() * (settings.tree.trunk.width.max - settings.tree.trunk.width.min);
        this.crownColor = settings.tree.crown.color.update(80, 95, 10, 20).toString();
        this.startPosition = startPosition;
        this.verticalStart = (settings.tree.verticalStart.min + Math.random() * (settings.tree.verticalStart.max - settings.tree.verticalStart.min));
        this.position = {
            x: this.startPosition,
            y: this.canvas.height - this.verticalStart
        };
        this.update();
        this.draw();
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(-this.width / 2, 0);
        this.ctx.quadraticCurveTo(-this.width / 4, -this.height / 2, -this.width / 2, -this.height);
        this.ctx.lineTo(this.width / 2, -this.height);
        this.ctx.quadraticCurveTo(this.width / 4, -this.height / 2, this.width / 2, 0);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.fillStyle = this.crownColor;
        const steeps = Math.trunc(random2(settings.tree.crown.count));
        const radius = Math.trunc(random2(settings.tree.crown.radius));
        for (let i = 0; i < 2 * Math.PI; i += (2 * Math.PI) / steeps) {
            const x = Math.cos(i) * random2(settings.tree.crown.radius);
            const y = -this.height + Math.sin(i) * random2(settings.tree.crown.radius)/2;
            this.drawCircle(x, y, radius);
        }
        this.ctx.restore();
    }

    private drawCircle(cx: number, cy: number, radius: number) {
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    update() {

        this.draw();
    }
}