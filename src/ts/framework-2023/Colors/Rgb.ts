export class Rgb {
    protected readonly red: number;
    protected readonly green: number;
    protected readonly blue: number;

    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    public toString = (): string => {
        return `rgb(${this.red},${this.green},${this.blue})`;
    }
}