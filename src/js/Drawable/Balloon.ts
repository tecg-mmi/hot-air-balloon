import {IDrawable} from "../Interfaces/IDrawable";
import {settings} from "../settings";
import {Canvas} from "./Canvas";
import {Tree} from "./Tree";
import {getDistance} from "../Helpers/helpers";
import {Circle} from "./Circle";
import {Fuel} from "./Fuel";

export class Balloon implements IDrawable {
    private position: { x: number, y: number };
    private velocity: { x: number, y: number };
    public isHeating: boolean;
    hitTree: boolean;
    private canvas: Canvas;
    private ctx: CanvasRenderingContext2D;
    private fuel: Fuel;


    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.ctx;
        this.isHeating = false;
        this.fuel = new Fuel(this.canvas.htmlCanvasElement, this.ctx);
        this.velocity = {...settings.balloon.velocity};
        this.update();
    }

    draw() {
        this.fuel.draw();
        this.ctx.save();

        this.ctx.translate(this.position.x, this.position.y);

        // Cart
        this.ctx.fillStyle = settings.balloon.border.color;
        this.ctx.fillRect(-settings.balloon.border.dimensions.width / 2, -(settings.balloon.border.dimensions.height + settings.balloon.basket.dimensions.height), settings.balloon.border.dimensions.width, settings.balloon.border.dimensions.height);
        this.ctx.fillStyle = settings.balloon.basket.color;
        this.ctx.fillRect(-settings.balloon.basket.dimensions.width / 2, -settings.balloon.basket.dimensions.height, settings.balloon.basket.dimensions.width, settings.balloon.basket.dimensions.height);

        // Cables
        this.ctx.strokeStyle = settings.balloon.cable.color;
        this.ctx.lineWidth = settings.balloon.cable.dimensions.width;
        this.ctx.beginPath();
        this.ctx.moveTo(-(settings.balloon.border.dimensions.width / 2 - settings.balloon.cable.spaceFromBorder), -(settings.balloon.border.dimensions.height + settings.balloon.basket.dimensions.height));
        this.ctx.lineTo(-(settings.balloon.border.dimensions.width / 2 - settings.balloon.cable.spaceFromBorder), -(settings.balloon.border.dimensions.height + settings.balloon.basket.dimensions.height + settings.balloon.cable.dimensions.height));
        this.ctx.moveTo((settings.balloon.border.dimensions.width / 2 - settings.balloon.cable.spaceFromBorder), -(settings.balloon.border.dimensions.height + settings.balloon.basket.dimensions.height));
        this.ctx.lineTo((settings.balloon.border.dimensions.width / 2 - settings.balloon.cable.spaceFromBorder), -(settings.balloon.border.dimensions.height + settings.balloon.basket.dimensions.height + settings.balloon.cable.dimensions.height));
        this.ctx.closePath();
        this.ctx.stroke();
        // Balloon
        this.ctx.fillStyle = settings.balloon.balloon.color;
        this.ctx.beginPath();
        this.ctx.moveTo(-(settings.balloon.border.dimensions.width / 2), -(settings.balloon.basket.dimensions.height + settings.balloon.cable.dimensions.height));
        this.ctx.quadraticCurveTo(-settings.balloon.balloon.radius, -settings.balloon.balloon.controlPointY, -settings.balloon.balloon.radius, -(settings.balloon.balloon.verticalStretch + settings.balloon.balloon.radius * 2));
        this.ctx.arc(0, -(settings.balloon.balloon.verticalStretch + settings.balloon.balloon.radius * 2), settings.balloon.balloon.radius, Math.PI, 0, false);
        this.ctx.quadraticCurveTo(settings.balloon.balloon.radius, -settings.balloon.balloon.controlPointY, settings.balloon.border.dimensions.width / 2, -(settings.balloon.basket.dimensions.height + settings.balloon.cable.dimensions.height));
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }

    update() {
        this.fuel.update();
        this.position = {
            x: settings.balloon.startPosition.x,
            y: this.canvas.htmlCanvasElement.height - settings.balloon.startPosition.y
        }
    }

    animate() {
        if (this.isHeating) {
            if (this.velocity.y > settings.balloon.minVelocity) {
                this.velocity.y -= settings.balloon.velocityCooling;
            }
            this.fuel.consume(this.velocity.y * -1);
        } else if (this.velocity.y < settings.balloon.maxVelocity) {
            this.velocity.y += settings.balloon.velocityHeating;
        }
        this.position.y += this.velocity.y;
        if (this.position.y >= this.canvas.htmlCanvasElement.height) {
            this.hitTree = true;
        }
        if (this.position.y < this.canvas.htmlCanvasElement.height) {
            this.position.x += settings.balloon.velocityHorizontal;
        }
        this.checkHit();
    }

    private checkHit() {
        this.canvas.trees.forEach((tree: Tree) => {
            tree.circles.forEach((circle: Circle) => {
                const bottomRight = {
                    x: this.position.x + settings.balloon.basket.dimensions.width / 2,
                    y: this.position.y
                };

                const bottomLeft = {
                    x: this.position.x - settings.balloon.basket.dimensions.width / 2,
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