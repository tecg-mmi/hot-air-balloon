export class Circle {
    private position: { x: number; y: number }
    private radius: number;
    private readonly ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, position: { x: number; y: number }, radius: number) {
        this.position = position;
        this.radius = radius;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }


}
