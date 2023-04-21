import {Animatable} from "../framework-2023/Types/Animatable";
import {Rectangle} from "../framework-2023/shapes/Rectangle";
import {Canvas} from "../framework-2023/Canvas";
import {Hsl} from "../framework-2023/Colors/Hsl";
import {settings} from "../settings";
import {Shape} from "../framework-2023/shapes/Shape";

export class Sky extends Shape implements Animatable {
    private readonly gradient: CanvasGradient;

    constructor(canvas: Canvas) {
        super({
            position: {x: 0, y: 0},
            canvas: canvas,
            color: new Hsl(0, 0, 0),
            direction: Math.PI * 2,
            speed: 0
        });
        this.gradient = this.canvas.ctx.createLinearGradient(this.canvas.width / 2, 0, this.canvas.width / 2, this.canvas.height);
        this.gradient.addColorStop(0, `${settings.sky.gradient[0]}`);
        this.gradient.addColorStop(1, `${settings.sky.gradient[1]}`);

    }

    draw(): this {
        this.ctx.fillStyle = this.gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); // dessine le rectangle centré sur l'origine
        return this;
    }

    update() {

    }
}