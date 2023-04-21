import {Hsl} from "./Hsl";

export class Hsla extends Hsl {
    private readonly alpha: number;

    constructor(hue: number, saturation: number, lightness: number, alpha: number) {
        super(hue, saturation, lightness);
        this.alpha = alpha;
    }

    public toString = (): string => {
        return `hsla(${this.hue},${this.saturation}%,${this.lightness}%,${this.alpha})`;
    }
}