import MathExtra from "../lib/math-extra";
import CStats from "./Stats";
import CItemCreationProperties from "./ItemCreationProperties";
import itemTypes from "../config/item-types";

const rarityMax = 5;
const rarityMod = 1.7;

export default class Item {
  name: string;
  type: string;
  subType: string;
  stats: CStats;
  slots: number;
  rarity: number;
  level: number;

  constructor(properties: CItemCreationProperties) {
    this.level = properties.level;

    this.determineRarity(properties);
    this.determineType(properties);
    this.determineSubType(properties);
    this.determineSlots(properties);
    this.determineStats(properties);
    this.determineName();
  }

  determineName() {
    const subType = itemTypes[this.type][this.subType];
    this.name = subType.name;
  }

  determineStats(properties: CItemCreationProperties) {
    this.stats = new CStats();

    const type = itemTypes[this.type];
    const subType = type[this.subType];
    const statBase = this.level * 10;
    const statModifiers = subType.statModifiers;

    for (const i in statModifiers) {
      let statValue = statModifiers[i] * statBase;

      statValue *= MathExtra.randomFloat(0.8, 1.2) + this.rarity * 0.2;
      statValue = Math.round(statValue);

      this.stats[i] = statValue;
    }
  }

  determineType(properties: CItemCreationProperties) {
    if (properties.type) {
      this.type = properties.type;
      return;
    }

    const itemTypeStrings = Object.keys(itemTypes);
    const itemTypeIndex = MathExtra.randomInt(0, itemTypeStrings.length - 1);
    this.type = itemTypeStrings[itemTypeIndex];
  }

  determineSubType(properties: CItemCreationProperties) {
    if (properties.subType) {
      this.subType = properties.subType;
      return;
    }

    const itemSubTypes = itemTypes[this.type];

    const itemSubTypeStrings = Object.keys(itemSubTypes);
    const itemSubTypeIndex = MathExtra.randomInt(
      0,
      itemSubTypeStrings.length - 1
    );
    this.subType = itemSubTypeStrings[itemSubTypeIndex];
  }

  determineSlots(properties: CItemCreationProperties) {
    const subType = itemTypes[this.type][this.subType];

    this.slots = subType.slots || 1;
  }

  determineRarity(properties: CItemCreationProperties) {
    if (properties.rarity) {
      this.rarity = properties.rarity;
      return;
    }

    const max = Math.ceil(Math.pow(2, rarityMax * rarityMod));
    const r = MathExtra.randomInt(0, max);
    let rarity = 0;

    for (var i = 1; i <= rarityMax; i++) {
      if (r <= Math.pow(2, i * rarityMod)) {
        rarity = rarityMax - (i - 1);
        break;
      }
    }

    this.rarity = rarity;
  }
}
