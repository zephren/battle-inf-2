interface IItemCreationProperties {
  type?: string;
  subType?: string;
  level?: number;
  rarity?: number;
  slots?: number;
}

export default class ItemCreationProperties {
  type: string = null;
  subType: string = null;
  level: number = 1;
  rarity: number = 0;
  slots: number = 1;
  value: number = 0;

  constructor(properties: IItemCreationProperties = {}) {
    this.type = properties.type || this.type;
    this.subType = properties.subType || this.subType;
    this.level = properties.level || this.level;
    this.rarity = properties.rarity || this.rarity;
    this.slots = properties.slots || this.slots;
  }
}
