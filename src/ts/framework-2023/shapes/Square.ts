import {Shape} from "./Shape";
import {ISquare} from "../Types/ISquare";

export class Square extends Shape {
    protected readonly side: number;

    constructor(square:ISquare) {
        super(square);
        this.side = square.side;
    }

    draw() {
        this.ctx.fillStyle = `${this.color}`;
        this.ctx.fillRect(this.position.x, this.position.y, this.side, this.side);
        return this;
    }
}