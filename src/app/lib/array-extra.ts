import MathExtra from "./math-extra";

export default class ArrayExtra {
  static shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  static randomItem(array: any[]) {
    const r = MathExtra.randomInt(0, array.length - 1);
    return array[r];
  }
}
