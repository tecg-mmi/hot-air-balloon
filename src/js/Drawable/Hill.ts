import {Hsl} from "../Helpers/Hsl";
import {IUpdate} from "./IUpdate";

export class Hill implements IUpdate {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly amplitude: number;
    private readonly height: number;
    private readonly startPosition: number;
    private readonly color: Hsl;


    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, count: number, height: number, startPosition: number, color: Hsl) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.amplitude = count;
        this.height = height;
        this.startPosition = startPosition;
        this.color = color;
        this.draw();
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height - this.startPosition);
        for (let i = 0; i < this.canvas.width; i++) {
            this.ctx.lineTo(i, (this.canvas.height - this.startPosition) - Math.sin(i * this.amplitude / this.canvas.width) * this.height / 2);
        }
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.color.toString();
        this.ctx.fill();
        this.ctx.closePath();
    }

    update() {
        this.draw();
    }
}

