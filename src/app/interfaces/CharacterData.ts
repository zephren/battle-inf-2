import IStats from "./Stats";
import IItemData from "./ItemData";

export default interface ICharacterData {
  name: string;
  statsBase: IStats;
  statsGrowth: IStats;
  statsTotal: IStats;
  equipment: IItemData[];
  exp: number;
  level: number;
  battlActionCode: string;
}
