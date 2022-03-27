export class Hsl {
    private readonly hue: number;
    private saturation: number;
    private lightness: number;

    constructor(hue: number, saturation: number, lightness: number) {
        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
    }

    update(minSaturation = 40, maxSaturation = 40, minLightness = 40, maxLightness = 40) {
        this.saturation = minSaturation + Math.random() * (maxSaturation - minSaturation);
        this.lightness = minLightness + Math.random() * (maxLightness - minLightness);
        return this;
    }

    toString(): string {
        return `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
    }
}