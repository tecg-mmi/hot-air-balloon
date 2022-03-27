export function random(min: number, max: number) {
    return min + Math.random() * (max - min);
}

export function random2(param: { min: number, max: number }) {
    return param.min + Math.random() * (param.max - param.min);
}