export class Hsl {
    protected readonly hue: number;
    protected readonly saturation: number;
    protected readonly lightness: number;

    constructor(hue: number, saturation: number, lightness: number) {
        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
    }

    public toString = (): string => {
        return `hsl(${this.hue},${this.saturation}%,${this.lightness}%)`;
    }
}