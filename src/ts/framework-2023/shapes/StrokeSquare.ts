import {Square} from "./Square";
import {IStrokeSquare} from "../Types/IStrokeSquare";

export class StrokeSquare extends Square {
    private readonly strokeWidth: number;

    constructor(strokeSquare: IStrokeSquare) {
        super(strokeSquare)
        this.strokeWidth = strokeSquare.strokeWidth;
    }

    draw() {
        this.ctx.strokeStyle = `${this.color}`;
        this.ctx.lineWidth = this.strokeWidth;
        this.ctx.strokeRect(this.position.x + this.strokeWidth / 2, this.position.y + this.strokeWidth / 2, this.side - this.strokeWidth, this.side - this.strokeWidth);
        return this;
    }
}