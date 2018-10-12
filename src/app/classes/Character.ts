import ICharacterData from "../interfaces/CharacterData";
import { createStats, cloneStats } from "../interfaces/Stats";
import { v4 as uuid } from "uuid";

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
        equipment: [],
        exp: 0,
        level: 1,
        battlActionCode: ""
      };

      data.statsBase.hp = 100;
      data.statsBase.atk = 20;
      data.statsBase.def = 10;
      data.statsBase.dex = 10;
    }

    this.data = data;
  }

  clone() {
    // Copy the data
    const character = new Character(JSON.parse(JSON.stringify(this.data)));

    return character;
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
