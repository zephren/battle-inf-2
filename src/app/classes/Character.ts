import ICharacterData from "../interfaces/CharacterData";
import { createStats, cloneStats, statCount } from "../interfaces/Stats";
import { v4 as uuid } from "uuid";
import ArrayExtra from "../lib/array-extra";
import MathExtra from "../lib/math-extra";

// Blank for fillter, it will never be shown
const qualities = ["", "D", "C", "B", "A", "S", "SS", "SSS", "X"];

export default class Character {
  data: ICharacterData;

  constructor(data: ICharacterData = null) {
    if (!data) {
      data = {
        id: uuid(),
        name: "",
        statsBase: createStats(),
        statsGrowth: createStats(),
        statsTotal: createStats(),
        statsActual: createStats(),
        statsGrowthRatioMin: 0,
        statsGrowthRatioMax: 0,
        statsPotential: 0,
        equipment: [],
        exp: 0,
        level: 1,
        battlActionCode: ""
      };

      data.statsBase.hp = 100;
      data.statsBase.atk = 20;
      data.statsBase.def = 10;
      data.statsBase.dex = 10;

      const growth = this.createGrowthRatio();

      data.statsGrowth = growth.stats;
      data.statsGrowthRatioMin = growth.ratioMin;
      data.statsGrowthRatioMax = growth.ratioMax;
      data.statsPotential = growth.potential;
    }

    this.data = data;
  }

  clone() {
    // Copy the data
    const character = new Character(JSON.parse(JSON.stringify(this.data)));

    return character;
  }

  getQuality() {
    const ratio = this.data.statsPotential / statCount();

    return qualities[Math.ceil(ratio * (qualities.length - 1))];
  }

  createGrowthRatio() {
    const stats = createStats();
    const statNames = Object.keys(stats);

    ArrayExtra.shuffleArray(statNames);

    const factor = 3;
    const magnitude = Math.pow(10, factor);
    const startMin = MathExtra.randomFloat(0, magnitude);

    const rMin = MathExtra.randomFloat(startMin, magnitude);
    const ratioMin = 1 - Math.pow(rMin, 1 / factor) / 10;

    const rMax = MathExtra.randomFloat(0, rMin);
    const ratioMax = 1 - Math.pow(rMax, 1 / factor) / 10;

    console.log({ rMin: rMin.toFixed(2), rMax: rMax.toFixed(2) });

    let potential = 0;
    for (const stat of statNames) {
      const value = MathExtra.randomFloat(ratioMin, ratioMax);
      // total -= value;
      stats[stat] = value;
      potential += value;
    }

    return {
      ratioMin,
      ratioMax,
      stats,
      potential
    };
  }

  updateTotalStats() {
    this.data.statsTotal = JSON.parse(JSON.stringify(this.data.statsBase));

    for (const item of this.data.equipment) {
      for (const i in item.stats) {
        this.data.statsTotal[i] += item.stats[i];
      }
    }
  }

  setActualStats() {
    this.data.statsActual = cloneStats(this.data.statsTotal);
  }
}
