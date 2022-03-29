// This interface is used to indicate that an element must be updated when the window is resized.
export interface IDrawable {
    draw(): void
    update(): void
}