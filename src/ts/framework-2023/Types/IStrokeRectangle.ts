import {IShape} from "./IShape";
import {IRectangle} from "./IRectangle";

export interface IStrokeRectangle extends IRectangle {
    strokeWidth: number;
}
