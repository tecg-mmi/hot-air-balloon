import {IDrawable} from "../Interfaces/IDrawable";
import {settings} from "../settings";
import {Canvas} from "./Canvas";
import {Tree} from "./Tree";
import {getDistance} from "../Helpers/helpers";
import {Circle} from "./Circle";

export class Balloon implements IDrawable {
    private position: { x: number, y: number };
    private velocity: { x: number, y: number };
    public isHeating: boolean;
    hitTree: boolean;
    private canvas: Canvas;
    private ctx: CanvasRenderingContext2D;


    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.ctx;
        this.isHeating = false;
        this.velocity = {...settings.Balloon.velocity};
        this.update();
    }

    draw() {
        this.ctx.save();

        this.ctx.translate(this.position.x, this.position.y);

        // Cart
        this.ctx.fillStyle = settings.Balloon.border.color;
        this.ctx.fillRect(-settings.Balloon.border.dimensions.width / 2, -(settings.Balloon.border.dimensions.height + settings.Balloon.basket.dimensions.height), settings.Balloon.border.dimensions.width, settings.Balloon.border.dimensions.height);
        this.ctx.fillStyle = settings.Balloon.basket.color;
        this.ctx.fillRect(-settings.Balloon.basket.dimensions.width / 2, -settings.Balloon.basket.dimensions.height, settings.Balloon.basket.dimensions.width, settings.Balloon.basket.dimensions.height);

        // Cables
        this.ctx.strokeStyle = settings.Balloon.cable.color;
        this.ctx.lineWidth = settings.Balloon.cable.dimensions.width;
        this.ctx.beginPath();
        this.ctx.moveTo(-(settings.Balloon.border.dimensions.width / 2 - settings.Balloon.cable.spaceFromBorder), -(settings.Balloon.border.dimensions.height + settings.Balloon.basket.dimensions.height));
        this.ctx.lineTo(-(settings.Balloon.border.dimensions.width / 2 - settings.Balloon.cable.spaceFromBorder), -(settings.Balloon.border.dimensions.height + settings.Balloon.basket.dimensions.height + settings.Balloon.cable.dimensions.height));
        this.ctx.moveTo((settings.Balloon.border.dimensions.width / 2 - settings.Balloon.cable.spaceFromBorder), -(settings.Balloon.border.dimensions.height + settings.Balloon.basket.dimensions.height));
        this.ctx.lineTo((settings.Balloon.border.dimensions.width / 2 - settings.Balloon.cable.spaceFromBorder), -(settings.Balloon.border.dimensions.height + settings.Balloon.basket.dimensions.height + settings.Balloon.cable.dimensions.height));
        this.ctx.stroke();

        // Balloon
        this.ctx.fillStyle = settings.Balloon.balloon.color;
        this.ctx.beginPath();
        this.ctx.moveTo(-(settings.Balloon.border.dimensions.width / 2), -(settings.Balloon.basket.dimensions.height + settings.Balloon.cable.dimensions.height));
        this.ctx.quadraticCurveTo(-settings.Balloon.balloon.radius, -settings.Balloon.balloon.controlPointY, -settings.Balloon.balloon.radius, -(settings.Balloon.balloon.verticalStretch + settings.Balloon.balloon.radius * 2));
        this.ctx.arc(0, -(settings.Balloon.balloon.verticalStretch + settings.Balloon.balloon.radius * 2), settings.Balloon.balloon.radius, Math.PI, 0, false);
        this.ctx.quadraticCurveTo(settings.Balloon.balloon.radius, -settings.Balloon.balloon.controlPointY, settings.Balloon.border.dimensions.width / 2, -(settings.Balloon.basket.dimensions.height + settings.Balloon.cable.dimensions.height));
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }

    update() {
        this.position = {
            x: settings.Balloon.startPosition.x,
            y: this.canvas.htmlCanvasElement.height - settings.Balloon.startPosition.y
        }
        console.log(this.position)
    }

    animate() {
        if (this.isHeating) {
            this.velocity.y -= settings.Balloon.velocityCooling;
        } else if (this.velocity.y < settings.Balloon.maxVelocity) {
            this.velocity.y += settings.Balloon.velocityHeating;
        }
        this.position.y += this.velocity.y;
        if (this.position.y >= this.canvas.htmlCanvasElement.height) {
            this.hitTree = true;
        }

        if (this.position.y < this.canvas.htmlCanvasElement.height) {
            this.position.x += settings.Balloon.velocityHorizontal;
        }
        this.checkHit();
    }

    private checkHit() {
        this.canvas.trees.forEach((tree: Tree) => {
            tree.circles.forEach((circle: Circle) => {
                const bottomRight = {
                    x: this.position.x + settings.Balloon.basket.dimensions.width / 2,
                    y: this.position.y
                };

                const bottomLeft = {
                    x: this.position.x - settings.Balloon.basket.dimensions.width / 2,
                    y: this.position.y
                };
                const circlePosition = {
                    x: tree.position.x + circle.position.x,
                    y: tree.position.y + circle.position.y
                }

                if (getDistance(bottomRight, circlePosition) <= circle.radius) {
                    this.hitTree = true;
                    return;
                }
                if (getDistance(bottomLeft, circlePosition) <= circle.radius) {
                    this.hitTree = true;
                    return;
                }
            });
        });
    }
}