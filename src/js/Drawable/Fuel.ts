import {Canvas} from "./Canvas";
import {settings} from "../settings";

export class Fuel {
    private htmlCanvasElement: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;
    private fuelQuantity: number;

    constructor(htmlCanvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.htmlCanvasElement = htmlCanvasElement;
        this.ctx = ctx;
        this.update();
        this.reset();
    }

    draw() {
        this.ctx.strokeStyle = settings.fuel.color;
        this.ctx.beginPath();
        this.ctx.rect(settings.fuel.left, settings.fuel.top, settings.fuel.width * this.htmlCanvasElement.width, settings.fuel.height * this.htmlCanvasElement.height);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.fillStyle = settings.fuel.color;
        this.ctx.fillRect(settings.fuel.left + settings.fuel.insetBorderWidth, settings.fuel.top + settings.fuel.insetBorderWidth, this.width * (this.fuelQuantity / settings.fuel.maxFuel), this.height);
        this.ctx.closePath();
        this.ctx.fill();

    }

    update() {
        this.width = settings.fuel.width * this.htmlCanvasElement.width - settings.fuel.insetBorderWidth * 2;
        this.height = settings.fuel.height * this.htmlCanvasElement.height - settings.fuel.insetBorderWidth * 2;
    }

    reset() {
        this.fuelQuantity = settings.fuel.maxFuel;
    }

    consume(velocity: number) {
        this.fuelQuantity -= velocity;
    }
}