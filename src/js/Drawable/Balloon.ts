import {IUpdate} from "./IUpdate";
import {settings} from "../settings";

export class Balloon implements IUpdate {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private position: { x: number, y: number };


    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.position = {x: settings.Balloon.startPosition.x, y: this.canvas.height - settings.Balloon.startPosition.y}
    }

    draw() {
        this.ctx.save();

        this.ctx.translate(this.position.x, this.position.y);

        // Cart
        this.ctx.fillStyle = settings.Balloon.border.color;
        this.ctx.fillRect(-settings.Balloon.border.dimensions.width / 2, -(settings.Balloon.border.dimensions.height + settings.Balloon.basket.dimensions.height), settings.Balloon.border.dimensions.width, settings.Balloon.border.dimensions.height);
        this.ctx.fillStyle = settings.Balloon.basket.color;
        this.ctx.fillRect(-settings.Balloon.basket.dimensions.width / 2, -settings.Balloon.basket.dimensions.height, settings.Balloon.basket.dimensions.width, settings.Balloon.basket.dimensions.height);

        // Cables
        this.ctx.strokeStyle = settings.Balloon.cable.color;
        this.ctx.lineWidth = settings.Balloon.cable.dimensions.width;
        this.ctx.beginPath();
        this.ctx.moveTo(-(settings.Balloon.border.dimensions.width / 2 - settings.Balloon.cable.spaceFromBorder), -(settings.Balloon.border.dimensions.height + settings.Balloon.basket.dimensions.height));
        this.ctx.lineTo(-(settings.Balloon.border.dimensions.width / 2 - settings.Balloon.cable.spaceFromBorder), -(settings.Balloon.border.dimensions.height + settings.Balloon.basket.dimensions.height + settings.Balloon.cable.dimensions.height));
        this.ctx.moveTo((settings.Balloon.border.dimensions.width / 2 - settings.Balloon.cable.spaceFromBorder), -(settings.Balloon.border.dimensions.height + settings.Balloon.basket.dimensions.height));
        this.ctx.lineTo((settings.Balloon.border.dimensions.width / 2 - settings.Balloon.cable.spaceFromBorder), -(settings.Balloon.border.dimensions.height + settings.Balloon.basket.dimensions.height + settings.Balloon.cable.dimensions.height));
        this.ctx.stroke();

        // Balloon
        this.ctx.fillStyle = settings.Balloon.balloon.color;
        this.ctx.beginPath();
        this.ctx.moveTo(-(settings.Balloon.border.dimensions.width / 2), -(settings.Balloon.basket.dimensions.height + settings.Balloon.cable.dimensions.height));
        this.ctx.quadraticCurveTo(-settings.Balloon.balloon.radius, -settings.Balloon.balloon.controlPointY, -settings.Balloon.balloon.radius, -(settings.Balloon.balloon.verticalStretch + settings.Balloon.balloon.radius*2));
        this.ctx.arc(0, -(settings.Balloon.balloon.verticalStretch + settings.Balloon.balloon.radius*2), settings.Balloon.balloon.radius, Math.PI, 0, false);
        this.ctx.quadraticCurveTo(settings.Balloon.balloon.radius, -settings.Balloon.balloon.controlPointY, settings.Balloon.border.dimensions.width / 2, -(settings.Balloon.basket.dimensions.height + settings.Balloon.cable.dimensions.height));
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }

    update() {
        this.draw();
    }
}