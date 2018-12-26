import ICharacterData from "../interfaces/CharacterData";
import IItemData from "../interfaces/ItemData";
import CEquipment from "./Equipment";
import { createItem } from "../interfaces/ItemData";
import nameGenerator from "../lib/name-generator";
import { createStats, cloneStats, statCount } from "../interfaces/Stats";
import { v4 as uuid } from "uuid";
import ArrayExtra from "../lib/array-extra";
import MathExtra from "../lib/math-extra";
import Stats from "../components/Stats";

const initialBattleActionCode = `const target = battle.targetOpponent();
battle.attack(target);`;

// Blank for fillter, it will never be shown
const qualities = ["", "D", "C", "B", "A", "S", "SS", "SSS", "X"];

export default class CCharacter {
  data: ICharacterData;

  constructor(data: ICharacterData = null, config: any = {}) {
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

      const growth = this.createGrowthRatio(config);

      data.statsGrowth = growth.stats;
      data.statsGrowthRatioMin = growth.ratioMin;
      data.statsGrowthRatioMax = growth.ratioMax;
      data.statsPotential = growth.potential;
    }

    this.data = data;

    this.updateBaseStats();
    this.updateTotalStats();
  }

  static createHero(initalData: any = null, config: any = {}) {
    const hero = new CCharacter(initalData, config);

    const data = hero.data;

    data.name =
      nameGenerator.randomName(2, 5) + " " + nameGenerator.randomName(2, 5);
    data.level = 1;
    data.battlActionCode = "";

    const equipment = new CEquipment(data.equipment);

    equipment.equip(createItem({ type: "head", rarity: 0 }));
    equipment.equip(createItem({ type: "body", rarity: 0 }));
    equipment.equip(createItem({ type: "legs", rarity: 0 }));
    equipment.equip(createItem({ type: "feet", rarity: 0 }));
    equipment.equip(createItem({ type: "hands", rarity: 0 }));
    equipment.equip(createItem({ type: "hand", rarity: 0 }));

    data.battlActionCode = initialBattleActionCode;

    return hero;
  }

  clone() {
    // Copy the data
    const character = new CCharacter(JSON.parse(JSON.stringify(this.data)));

    return character;
  }

  getQuality() {
    const ratio = this.data.statsPotential / statCount();

    return qualities[Math.ceil(ratio * (qualities.length - 1))];
  }

  /**
   * This works, it's too late to explain how
   *
   * @param config
   */
  createGrowthRatio(config: any = {}) {
    const factor = 3;
    const magnitude = Math.pow(10, factor); // A lower value here means higher stats, 1000

    const stats = createStats();
    const statNames = Object.keys(stats);
    let potentialMin = 0;
    let potentialMax = 1;

    if (config.potentialRange) {
      if (config.potentialRange[0]) {
        potentialMin = Math.pow(config.potentialRange[0], 1.0 / factor);
        // potentialMin = config.potentialRange[0];
      }

      if (config.potentialRange[1]) {
        potentialMax = Math.pow(config.potentialRange[1], 1.0 / factor);
        // potentialMax = config.potentialRange[1];
      }
    }

    ArrayExtra.shuffleArray(statNames);

    let ratioMin = 0;
    let ratioMax = 1;

    const startMin = MathExtra.randomFloat(
      (1 - potentialMax) * magnitude,
      (1 - potentialMin) * magnitude
    ); // A lower value here means higher stats, 0 to 1000

    const rMin = MathExtra.randomFloat(
      startMin,
      (1 - potentialMin) * magnitude
    );

    ratioMin = 1 - Math.pow(rMin, 1 / factor) / 10;

    const rMax = MathExtra.randomFloat((1 - potentialMax) * magnitude, rMin);
    ratioMax = 1 - Math.pow(rMax, 1 / factor) / 10;

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

  createBaseStats() {
    const stats = createStats();

    stats.hp = 50;
    stats.atk = 2;
    stats.def = 1;
    stats.dex = 1;

    return stats;
  }

  updateBaseStats(mod: number = 1) {
    const stats = this.createBaseStats();
    const level = this.data.level;
    const statsGrowth = this.data.statsGrowth;

    for (const stat in stats) {
      stats[stat] = Math.round(
        stats[stat] * Math.pow(1 + level, 1 + statsGrowth[stat]) * mod
      );
    }

    this.data.statsBase = stats;
  }

  updateTotalStats() {
    this.data.statsTotal = JSON.parse(JSON.stringify(this.data.statsBase));

    for (const stat in this.data.statsTotal) {
      this.data.statsTotal[stat] = Math.round(this.data.statsTotal[stat]);
    }

    for (const item of this.data.equipment) {
      for (const i in item.stats) {
        this.data.statsTotal[i] += item.stats[i];
      }
    }
  }

  setActualStats() {
    this.data.statsActual = cloneStats(this.data.statsTotal);
  }

  getEquipment(): CEquipment {
    return new CEquipment(this.data.equipment);
  }

  equip(item: IItemData): IItemData[] {
    const equipment = this.getEquipment();
    const items = equipment.equip(item);
    return items;
  }

  unequip(item: IItemData): IItemData[] {
    const equipment = this.getEquipment();
    const items = equipment.unequip(item);
    return items;
  }

  addExp(amount: number) {
    let levelUp = false;
    this.data.exp += amount;

    while (this.data.exp > this.getExpForLevel(this.data.level)) {
      this.data.exp -= this.getExpForLevel(this.data.level);
      this.data.level++;
      levelUp = true;
    }

    if (levelUp) {
      this.updateBaseStats();
      this.updateTotalStats();
    }
  }

  getExpForLevel(level: number) {
    return 20 + level * level * 10;
  }
}
