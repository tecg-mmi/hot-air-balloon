import {Rectangle} from "./Rectangle";
import {IStrokeRectangle} from "../Types/IStrokeRectangle";

/*
 *
 */
export class StrokeRectangle extends Rectangle {
    private readonly strokeWidth: number;

    constructor(strokeRectangle: IStrokeRectangle) {
        super(strokeRectangle)
        this.strokeWidth = strokeRectangle.strokeWidth;
    }

    /**
     *
     */
    draw() {
        this.ctx.strokeStyle = `${this.color}`;
        this.ctx.lineWidth = this.strokeWidth;
        this.ctx.strokeRect(this.position.x + this.strokeWidth / 2, this.position.y + this.strokeWidth / 2, this.width - this.strokeWidth, this.height - this.strokeWidth);
        return this;
    }
}