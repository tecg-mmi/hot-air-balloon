import {IShape} from "./IShape";
import {ISquare} from "./ISquare";

export interface IStrokeSquare extends ISquare {
    strokeWidth: number;
}
