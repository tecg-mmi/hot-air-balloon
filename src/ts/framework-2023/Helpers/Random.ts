import {MinMax} from "../Types/MinMax";

export class Random {
    private readonly min: number;
    private readonly max: number;

    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }

    nextInt(): number {
        if (this.min < this.max) {
            return this.min + Math.random() * (this.max - this.min);
        }
        return Math.floor(1 + Math.random() * 100);
    }

    static nextInt(min: number, max: number): number {
        if (min < max) {
            return Math.floor(min + Math.random() * (max - min));
        }
        return Math.floor(1 + Math.random() * 100);
    }

    static nextIntMinMax(minMax: MinMax): number {
        return this.nextInt(minMax.min, minMax.max);
    }

    nextFloat(): number {
        if (this.min < this.max) {
            return this.min + Math.random() * (this.max - this.min);
        }
        return 1 + Math.random() * 100;
    }

    static nextFloat(min: number, max: number): number {
        if (min < max) {
            return min + Math.random() * (max - min);
        }
        return 1 + Math.random() * 100;
    }

    static nextFloatMinMax(minMax: MinMax): number {
        return this.nextFloat(minMax.min, minMax.max);
    }
}