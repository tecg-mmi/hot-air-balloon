import {Animatable} from "../framework-2023/Types/Animatable";
import {Canvas} from "../framework-2023/Canvas";
import {Hsl} from "../framework-2023/Colors/Hsl";
import {Position} from "../framework-2023/Types/Position";

export class Hill implements Animatable {
    private readonly canvas: Canvas;
    private readonly color: Hsl;
    private readonly startPosition: number;
    private points: Position[] = [];


    constructor(canvas: Canvas, color: Hsl, startPosition: number) {
        this.canvas = canvas;
        this.color = color;
        this.startPosition = startPosition;
        for (let i = 0; i < this.canvas.width; i++) {
            this.points.push({
                x: i,
                y: this.canvas.height - this.startPosition
            })
        }
    }

    draw(): void {
        const ctx = this.canvas.ctx;
        ctx.beginPath();
        ctx.moveTo(0, this.canvas.height);
        ctx.lineTo(0, this.canvas.height - this.startPosition);
        this.points.forEach((point) => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.lineTo(this.canvas.width, this.canvas.height);
        ctx.fillStyle = `${this.color}`;
        ctx.closePath();
        ctx.fill();
    }

    update(): void {
    }


}