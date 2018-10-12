import ICharacterData from "../interfaces/CharacterData";
import IItemData, { createItem } from "../interfaces/ItemData";
import CEquipment from "./Equipment";
import nameGenerator from "../lib/name-generator";

import CCharacter from "./Character";

const initialBattleActionCode = `const target = battle.targetOpponent();
battle.attack(target);`;

export default class Hero extends CCharacter {
  constructor(iniitalData: ICharacterData = null) {
    super(iniitalData);

    if (!iniitalData) {
      const data = this.data;

      data.name =
        nameGenerator.randomName(2, 5) + " " + nameGenerator.randomName(2, 5);
      data.level = 1;
      data.battlActionCode = "";

      const equipment = new CEquipment(this.data.equipment);

      equipment.equip(createItem({ type: "head" }));
      equipment.equip(createItem({ type: "body" }));
      equipment.equip(createItem({ type: "legs" }));

      this.data.battlActionCode = initialBattleActionCode;
    }
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
}
