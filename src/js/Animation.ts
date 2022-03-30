import {Canvas} from "./Drawable/Canvas";
import {Tree} from "./Drawable/Tree";

export class Animation {
    private canvas: Canvas;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
    }

    animate() {
        this.canvas.trees.forEach((tree: Tree) => {
            tree.animate();
        });
        if (this.canvas.trees.filter((tree: Tree) => tree.isOutSide).length > 0) {
            if (Math.random()*10 % 3) {
                this.canvas.trees.push(new Tree(this.canvas))
            }
        }
        this.canvas.balloon.animate();
        this.canvas.draw();
        if (this.canvas.balloon.hitTree) {
            return
        }
        requestAnimationFrame(() => {
            this.animate();
        });
    }
}