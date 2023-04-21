export class RandomArray<Type> {
    private readonly array: Array<Type>;

    constructor(array: Array<Type>) {
        this.array = array
    }

    getRandomValue(): Type {
        return this.array[Math.floor(Math.random() * this.array.length)];
    }
}
