import CStats from "./Stats";
import CEquipment from "./Equipment";
import nameGenerator from "../lib/name-generator";

import CItem from "./Item";
import CItemCreationProperties from "./ItemCreationProperties";

export default class Hero {
  name: string;
  statsBase: CStats;
  statsGrowth: CStats;
  statsTotal: CStats;
  equipment: CEquipment;
  exp: number;
  level: number;

  constructor() {
    this.name =
      nameGenerator.randomName(2, 5) + " " + nameGenerator.randomName(2, 5);
    this.level = 1;

    this.statsBase = new CStats();

    this.statsBase.hp = 100;
    this.statsBase.atk = 20;
    this.statsBase.def = 10;

    this.statsGrowth = new CStats();
    this.statsTotal = new CStats();

    this.equipment = new CEquipment();
    this.equipment.equip(
      new CItem(new CItemCreationProperties({ type: "head" }))
    );
    this.equipment.equip(
      new CItem(new CItemCreationProperties({ type: "body" }))
    );
    this.equipment.equip(
      new CItem(new CItemCreationProperties({ type: "legs" }))
    );
  }

  equip(item: CItem) {
    const items = this.equipment.equip(item);

    return items;
  }

  unequip(item: CItem) {
    const items = this.equipment.unequip(item);

    return items;
  }
}
