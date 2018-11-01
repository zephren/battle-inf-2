import IStatsRange from "./StatsRange";

export default interface IEnemyClass {
  name: string;
  behaviors: any[];
  statRatios: IStatsRange;
}
