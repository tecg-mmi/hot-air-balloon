import {Sky} from "./Drawable/Sky";
import {Canvas} from "./framework-2023/Canvas";
import {settings} from "./settings";
import {Hill} from "./Drawable/Hill";

function main() {
    const hills: Hill[] = [];
    const start = document.querySelector(settings.elements.start);
    start.classList.add('hide');
    const canvas = new Canvas(document.getElementById(settings.canvas.background) as HTMLCanvasElement);
    const sky = new Sky(canvas);
    sky.draw();

    settings.hills.forEach((hill) => {
        const currentHill = new Hill(canvas, hill.color, hill.startPosition, hill.amplitude, hill.radius);
        currentHill.draw();
        hills.push(currentHill);

    });

    window.addEventListener('resize', () => {
        sky.draw();
    });
}

main();