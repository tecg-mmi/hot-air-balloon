import {IDrawable} from "../Interfaces/IDrawable";
import {settings} from "../settings";
import {Canvas} from "./Canvas";
import {Tree} from "./Tree";
import {getDistance} from "../Helpers/helpers";
import {Circle} from "./Circle";
import {Fuel} from "./Fuel";
import {Meter} from "./Meter";

export class Balloon implements IDrawable {
    private position: { x: number, y: number };
    private velocity: { x: number, y: number };
    public isHeating: boolean;
    public gameOver: boolean;
    private ctx: CanvasRenderingContext2D;
    private fuel: Fuel;
    private meter: Meter;
    private trees: Tree[];
    private gameCanvasElement: HTMLCanvasElement;
    public message: String;

    constructor(gameCanvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D, trees: Tree[]) {
        this.gameCanvasElement = gameCanvasElement;
        this.ctx = ctx;
        this.reset(trees)
    }

    draw() {
        this.fuel.draw();
        this.meter.draw();
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

    resize() {
        this.fuel.resize();
        this.position = {
            x: settings.balloon.startPosition.x,
            y: this.gameCanvasElement.height - settings.balloon.startPosition.y
        }
    }

    animate() {
        if (this.isHeating) {
            if (this.velocity.y > settings.balloon.minVelocity) {
                this.velocity.y -= settings.balloon.velocityCooling;
            }
            this.fuel.consume(this.velocity.y * -1.3);
            if (this.fuel.fuelQuantity <= 0) {
                this.gameOver = true;
                this.message = settings.messages.fuel;
            }
        } else if (this.velocity.y < settings.balloon.maxVelocity) {
            this.velocity.y += settings.balloon.velocityHeating;
        }
        this.position.y += this.velocity.y;
        this.position.y = Math.trunc(this.position.y);
        if (this.position.y >= this.gameCanvasElement.height) {
            this.message = settings.messages.floor;
            this.gameOver = true;
        }
        if (this.position.y < this.gameCanvasElement.height) {
            this.position.x += settings.balloon.velocityHorizontal;
            if (Math.trunc(this.position.x) % 6 === 0) {
                this.meter.updateMeters();
            }
        }
        this.checkHit();
        this.draw();
    }

    private checkHit() {
        this.trees.forEach((tree: Tree) => {
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
                    this.gameOver = true;
                    this.message = settings.messages.hitTree;
                    return;
                }
                if (getDistance(bottomLeft, circlePosition) <= circle.radius) {
                    this.message = settings.messages.hitTree;
                    this.gameOver = true;
                    return;
                }
            });
        });
    }

    reset(trees: Tree[]) {
        this.message = "";
        this.gameOver = false;
        this.trees = trees;
        this.isHeating = false;
        this.fuel = new Fuel(this.gameCanvasElement, this.ctx);
        this.meter = new Meter(document.getElementById(settings.canvas.meters) as HTMLSpanElement);
        this.velocity = {...settings.balloon.velocity};
        this.resize();
    }
}