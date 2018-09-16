import IStats from "./Stats";
import IItemData from "./ItemData";

export default interface ICharacterData {
  id: string;
  name: string;
  statsBase: IStats;
  statsGrowth: IStats;
  statsTotal: IStats;
  statsActual: IStats;
  equipment: IItemData[];
  exp: number;
  level: number;
  battlActionCode: string;
}
