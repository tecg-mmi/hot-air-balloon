import {random2} from "../Helpers/helpers";
import {settings} from "../settings";

export class Fir {
    private readonly ctx: CanvasRenderingContext2D;
    public position: { x: number, y: number }
    private height: number;
    private width: number;
    private triangle: { width: number; height: number };
    private color: string;

    constructor(ctx: CanvasRenderingContext2D, position: { x: number; y: number }) {
        this.ctx = ctx;
        this.position = position;
        this.height = random2(settings.fire.height);
        this.width = random2(settings.fire.width);
        this.triangle = {
            width: random2(settings.fire.triangle.width),
            height: random2(settings.fire.triangle.height),
        };
        this.color = settings.fire.color.update().toString()
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.x - this.width / 2, this.position.y - this.height, this.width, this.height);
        this.ctx.save();
        this.ctx.translate(this.position.x, this.position.y - this.height);
        this.ctx.beginPath();
        this.ctx.lineTo(-this.triangle.width / 2, 0);
        this.ctx.lineTo(0, -this.triangle.height);
        this.ctx.lineTo(this.triangle.width / 2, 0);
        this.ctx.fill()
        this.ctx.closePath();
        this.ctx.restore();
    }
}