import {Rgb} from "../Colors/Rgb";
import {Hsl} from "../Colors/Hsl";
import {Canvas} from "../Canvas";

export interface IMouse {
    radius?: number;
    canvas:Canvas;
    color: Rgb | Hsl;

}