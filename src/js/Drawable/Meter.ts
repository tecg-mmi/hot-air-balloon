import {settings} from "../settings";

export class Meter {
    private meters: number;
    private meter: HTMLSpanElement;

    constructor(meter: HTMLSpanElement) {
        this.meters = 0;
        this.meter = meter;
    }

    draw() {
        this.meter.textContent = `${this.meters} m`;
    }

    updateMeters() {
        this.meters++;
    }

}