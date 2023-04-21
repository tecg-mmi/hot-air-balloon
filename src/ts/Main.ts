import {Sky} from "./Drawable/Sky";
import {Canvas} from "./framework-2023/Canvas";
import {settings} from "./settings";
import {Hill} from "./Drawable/Hill";

function main() {
    const start = document.querySelector(settings.elements.start);
    start.classList.add('hide');
    const canvas = new Canvas(document.getElementById(settings.canvas.background) as HTMLCanvasElement);
    const sky = new Sky(canvas);
    sky.draw();

    const hill = new Hill(canvas, settings.hills[0].color, settings.hills[0].startPosition);
    hill.draw();

    window.addEventListener('resize', () => {
        sky.draw();
    });
}

main();