import {Animation} from "./Animation";
import {Balloon} from "./Drawable/Balloon";

export class GameController {
    private isStart: boolean;
    private animation: Animation;
    private balloon: Balloon;
    private fuel: number;

    constructor(animation: Animation, balloon: Balloon) {
        this.isStart = false;
        this.balloon = balloon;
        this.animation = animation;
        this.addEventListeners()
    }

    addEventListeners() {
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (!this.isStart && e.key === 'ArrowDown') {
                this.start();
            }
            if (e.key === 'ArrowDown') {
                this.balloon.isHeating = true;
            }
        });

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                this.balloon.isHeating = false;
            }
        });
    }

    start() {
        this.isStart = true;
        this.animation.animate();
    }

}