import {Sky} from "./Drawable/Sky";
import {Canvas} from "./framework-2023/Canvas";
import {settings} from "./settings";

function main() {
    const start = document.querySelector(settings.elements.start);
    start.classList.add('hide');
    const canvas = new Canvas(document.getElementById(settings.canvas.background) as HTMLCanvasElement);
    const sky = new Sky(canvas, settings.sky.gradient[0]);
    sky.draw();
}

main();