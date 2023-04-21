import {Dimension} from "./Types/Dimension";

export class Canvas {
    private _height: number;
    private _width: number;
    public canvasElement: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;
    private readonly autoDimension: boolean;

    public set height(value: number) {
        if (value > 0) {
            this._height = value;
            this.canvasElement.height = value;
        }
    }

    public set width(value: number) {
        if (value > 0) {
            this._width = value;
            this.canvasElement.width = value;
        }
    }


    get height(): number {
        return this._height;
    }

    get width(): number {
        return this._width;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    constructor(canvasElement: HTMLCanvasElement, dimension?: Dimension) {
        this.canvasElement = canvasElement;
        if (dimension !== undefined) {
            this.height = dimension.height;
            this.width = dimension.width;
        } else {
            this.autoDimension = true;
            this.width = innerWidth;
            this.height = window.innerHeight;
        }
        this.ctx = this.canvasElement.getContext('2d');

        if (this.autoDimension || this.autoDimension) {
            window.addEventListener('resize', () => {
                if (this.autoDimension) {
                    this.height = innerHeight;
                    this.width = innerWidth;
                }
            })
        }
    }


}