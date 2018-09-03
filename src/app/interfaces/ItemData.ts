import IStats, { createStats } from "./Stats";
import IItemCreationProperties from "./ItemCreationProperties";
import MathExtra from "../lib/math-extra";
import itemTypes from "../config/item-types";

export default interface IItemData {
  name?: string;
  type?: string;
  subType?: string;
  stats?: IStats;
  slots?: number;
  rarity?: number;
  level?: number;
}

const rarityMax = 5;
const rarityMod = 1.7;

export function createItem(properties: IItemCreationProperties = {}) {
  const item: IItemData = {};

  item.level = properties.level;

  determineRarity(item, properties);
  determineType(item, properties);
  determineSubType(item, properties);
  determineSlots(item, properties);
  determineStats(item, properties);
  determineName(item);

  return item;
}

function determineName(item: IItemData) {
  const subType = itemTypes[item.type][item.subType];
  item.name = subType.name;
}

function determineStats(item: IItemData, properties: IItemCreationProperties) {
  item.stats = createStats();

  const type = itemTypes[item.type];
  const subType = type[item.subType];
  const statBase = item.level * 10;
  const statModifiers = subType.statModifiers;

  for (const i in statModifiers) {
    let statValue = statModifiers[i] * statBase;

    statValue *= MathExtra.randomFloat(0.8, 1.2) + item.rarity * 0.2;
    statValue = Math.round(statValue);

    item.stats[i] = statValue;
  }
}

function determineType(item: IItemData, properties: IItemCreationProperties) {
  if (properties.type) {
    item.type = properties.type;
    return;
  }

  const itemTypeStrings = Object.keys(itemTypes);
  const itemTypeIndex = MathExtra.randomInt(0, itemTypeStrings.length - 1);
  item.type = itemTypeStrings[itemTypeIndex];
}

function determineSubType(
  item: IItemData,
  properties: IItemCreationProperties
) {
  if (properties.subType) {
    item.subType = properties.subType;
    return;
  }

  const itemSubTypes = itemTypes[item.type];

  const itemSubTypeStrings = Object.keys(itemSubTypes);
  const itemSubTypeIndex = MathExtra.randomInt(
    0,
    itemSubTypeStrings.length - 1
  );
  item.subType = itemSubTypeStrings[itemSubTypeIndex];
}

function determineSlots(item: IItemData, properties: IItemCreationProperties) {
  const subType = itemTypes[item.type][item.subType];

  item.slots = subType.slots || 1;
}

function determineRarity(item: IItemData, properties: IItemCreationProperties) {
  if (properties.rarity) {
    item.rarity = properties.rarity;
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

  item.rarity = rarity;
}
