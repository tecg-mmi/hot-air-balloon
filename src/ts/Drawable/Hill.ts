import {Animatable} from "../framework-2023/Types/Animatable";
import {Canvas} from "../framework-2023/Canvas";
import {Hsl} from "../framework-2023/Colors/Hsl";
import {Position} from "../framework-2023/Types/Position";

export class Hill implements Animatable {
    private readonly canvas: Canvas;
    private readonly color: Hsl;
    private readonly startPosition: number;
    private readonly amplitude: number;
    private readonly radius: number;


    constructor(canvas: Canvas, color: Hsl, startPosition: number, amplitude: number, height: number) {
        this.canvas = canvas;
        this.color = color;
        this.startPosition = startPosition;
        this.amplitude = amplitude;
        this.radius = height;
    }

    draw(): void {
        const ctx = this.canvas.ctx;
        ctx.beginPath();
        ctx.moveTo(0, this.canvas.height);
        ctx.lineTo(0, this.canvas.height - this.startPosition);
        for (let i = 0; i < this.canvas.width; i++) {
            ctx.lineTo(i, (this.canvas.height - this.startPosition) - Math.sin(i * this.amplitude / this.canvas.width) * this.radius);
        }
        ctx.lineTo(this.canvas.width, this.canvas.height);
        ctx.fillStyle = `${this.color}`;
        ctx.closePath();
        ctx.fill();
    }

    update(): void {
    }


}