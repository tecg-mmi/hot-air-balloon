export function random(min: number, max: number) {
    return random2({min: min, max: max});
}

export function random2(param: { min: number, max: number }) {
    return param.min + Math.random() * (param.max - param.min);
}

export function getDistance(point1: { x: number, y: number }, point2: { x: number, y: number }) {
    return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
}