import {settings} from "../settings";
import {IUpdate} from "./IUpdate";

export class Sky implements IUpdate {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private gradient: CanvasGradient;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    generateGradient() {
        this.gradient = this.ctx.createLinearGradient(this.canvas.width / 2, 0, this.canvas.width / 2, this.canvas.height);
        for (let i = 0; i < settings.sky.gradient.length; i++) {
            this.gradient.addColorStop(i * (1 / (settings.sky.gradient.length - 1)), settings.sky.gradient[i])
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.closePath();
    }

    update() {
        this.generateGradient();
        this.draw();
    }

}