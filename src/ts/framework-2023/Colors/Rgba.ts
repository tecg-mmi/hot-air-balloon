import {Rgb} from "./Rgb";

export class Rgba extends Rgb {
    private readonly alpha: number;

    constructor(red: number, green: number, blue: number, alpha: number) {
        super(red, green, blue);
        this.alpha = alpha;
    }


    public toString = (): string => {
        return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
    }
}