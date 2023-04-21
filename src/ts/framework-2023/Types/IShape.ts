import {Canvas} from "../Canvas";
import {Hsl} from "../Colors/Hsl";
import {Rgb} from "../Colors/Rgb";
import {Position} from "./Position";

export interface IShape {
    canvas: Canvas;
    position: Position;
    speed?: number;
    direction?: number;
    color: Hsl | Rgb;
}