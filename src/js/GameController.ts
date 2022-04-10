import {Animation} from "./Animation";
import {Balloon} from "./Drawable/Balloon";

export class GameController {
    private isStart: boolean;
    private animation: Animation;
    private balloon: Balloon;
    private startText: HTMLParagraphElement;
    private playAgainText: HTMLParagraphElement;

    constructor(animation: Animation, balloon: Balloon) {
        this.isStart = false;
        this.balloon = balloon;
        this.animation = animation;
        this.startText = document.querySelector('.start');
        this.playAgainText = document.querySelector('.playAgain') as HTMLParagraphElement;
        this.addEventListeners()
    }

    addEventListeners() {
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (!this.isStart && e.key === 'ArrowDown') {
                this.start();
            }
            if (this.isStart && e.key === 'ArrowDown') {
                this.balloon.isHeating = true;
            }
        });

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            if (this.isStart && e.key === 'ArrowDown') {
                this.balloon.isHeating = false;
            }
        });
    }

    reset(): void {
        this.isStart = false;
        // @ts-ignore
        this.playAgainText.textContent = this.balloon.message;
        this.playAgainText.classList.add('show');
        this.animation.reset();
    }

    start() {
        this.playAgainText.classList.remove('show');
        this.startText.classList.add('hide');
        this.isStart = true;
        this.animation.animate(() => {
            this.reset();
        });
    }

}