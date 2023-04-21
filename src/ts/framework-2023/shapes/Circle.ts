import {Position} from "../Types/position";
import {Shape} from "./Shape";
import {Animatable} from "../Types/Animatable";
import {ICircle} from "../Types/ICircle";

export class Circle extends Shape implements Animatable {
    protected readonly radius: number;

    constructor(circle: ICircle) {
        super(circle);
        this.radius = circle.radius;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = `${this.color}`;
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        return this;
    }

    update() {
        // Calculer la prochaine position du cercle en fonction de sa vitesse et de sa direction
        const nextX = Math.trunc(this.position.x + this.speed * Math.cos(this.direction));
        const nextY = Math.trunc(this.position.y + this.speed * Math.sin(this.direction));

        // Vérifier si le cercle touche le bord droit ou gauche de la zone de dessin
        if (nextX + this.radius >= this.canvas.width || nextX - this.radius <= 0) {
            // Inverser la direction horizontale du cercle
            this.direction = Math.PI - this.direction;
        }

        // Vérifier si le cercle touche le bord haut ou bas de la zone de dessin
        if (nextY + this.radius >= this.canvas.height || nextY - this.radius <= 0) {
            // Inverser la direction verticale du cercle
            this.direction = -this.direction;
        }

        // Mettre à jour la position du cercle
        this.position.x += Math.trunc(this.speed * Math.cos(this.direction));
        this.position.y += Math.trunc(this.speed * Math.sin(this.direction));
    }

    setDirectionByMousePosition(position: Position) {
        this.direction = Math.atan2(position.y - this.position.y, position.x - this.position.x);
    }
}