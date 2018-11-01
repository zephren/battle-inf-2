import IEnemyClass from "./EnemyClass";
import IStatsRange from "./StatsRange";

export default interface IEnemyType {
  name: string;
  classes: IEnemyClass[];
  statRatios: IStatsRange;
}
