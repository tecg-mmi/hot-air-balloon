import {Canvas} from "./Canvas";
import {settings} from "../settings";
import {IDrawable} from "../Interfaces/IDrawable";

export class Fuel implements IDrawable{
    private htmlCanvasElement: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;
    public fuelQuantity: number;

    constructor(htmlCanvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.htmlCanvasElement = htmlCanvasElement;
        this.ctx = ctx;
        this.resize();
        this.reset();
    }

    draw() {
        this.ctx.strokeStyle = settings.fuel.color;
        this.ctx.beginPath();
        this.ctx.rect(settings.fuel.left, settings.fuel.top, settings.fuel.width, settings.fuel.height);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.fillStyle = settings.fuel.color;
        this.ctx.fillRect(settings.fuel.left + settings.fuel.insetBorderWidth, settings.fuel.top + settings.fuel.insetBorderWidth, this.width * (this.fuelQuantity / settings.fuel.maxFuel), this.height);
        this.ctx.closePath();
        this.ctx.fill();

    }

    resize() {
        this.width = settings.fuel.width - settings.fuel.insetBorderWidth * 2;
        this.height = settings.fuel.height - settings.fuel.insetBorderWidth * 2;
    }

    reset() {
        this.fuelQuantity = settings.fuel.maxFuel;
    }

    consume(velocity: number) {
        this.fuelQuantity -= velocity;
    }
}