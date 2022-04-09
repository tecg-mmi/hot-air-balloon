import {Hsl} from "../Helpers/Hsl";
import {IDrawable} from "../Interfaces/IDrawable";
import {Fir} from "./Fir";
import {settings} from "../settings";

export class Hill implements IDrawable {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly amplitude: number;
    private readonly height: number;
    private readonly startPosition: number;
    private readonly color: Hsl;
    private readonly withFir: boolean;
    private firs: Fir[];
    private points: {
        x: number,
        y: number
    }[];


    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, count: number, height: number, startPosition: number, color: Hsl, withFir: boolean = false) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.withFir = withFir;
        this.amplitude = count;
        this.height = height;
        this.startPosition = startPosition;
        this.color = color;
        this.resize();
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height - this.startPosition);
        this.points.forEach((point) => {
            this.ctx.lineTo(point.x, point.y);
        });
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.color.toString();
        this.ctx.closePath();
        this.ctx.fill();
        this.firs.forEach((fir: Fir) => {
            fir.draw();
        });
    }

    resize() {
        this.points = [];
        this.firs = [];
        for (let i = 0; i < this.canvas.width; i++) {
            const position = {
                x: i,
                y: (this.canvas.height - this.startPosition) - Math.sin(i * this.amplitude / this.canvas.width) * this.height / 2
            }
            if (this.withFir && i !== 0 && i % settings.fire.steeps == 0) {
                this.firs.push(new Fir(this.ctx, position))
            }
            this.points.push(position);
        }
    }
}

