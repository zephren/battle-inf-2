export default class MathExtra {
  static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomIntFromArray(array: number[]): number {
    const min = array[0];
    const max = array[1];
    return this.randomInt(min, max);
  }

  static randomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  static randomFloatFromArray(array: number[]): number {
    const min = array[0];
    const max = array[1];
    return this.randomFloat(min, max);
  }
}
