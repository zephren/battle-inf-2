import ICharacterData from "../interfaces/CharacterData";
import IItemData from "../interfaces/ItemData";
import { createStats } from "../interfaces/Stats";

export default class Character {
  data: ICharacterData;

  constructor(data: ICharacterData = null) {
    if (!data) {
      data = {
        name: "",
        statsBase: createStats(),
        statsGrowth: createStats(),
        statsTotal: createStats(),
        equipment: [],
        exp: 0,
        level: 1,
        battlActionCode: ""
      };

      data.statsBase.hp = 100;
      data.statsBase.atk = 20;
      data.statsBase.def = 10;
    }

    this.data = data;
  }
}
