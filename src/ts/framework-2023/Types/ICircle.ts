import {Canvas} from "../Canvas";
import {Hsl} from "../Colors/Hsl";
import {Rgb} from "../Colors/Rgb";
import {Position} from "./Position";
import {IShape} from "./IShape";

export interface ICircle extends IShape {
    radius: number;
}
