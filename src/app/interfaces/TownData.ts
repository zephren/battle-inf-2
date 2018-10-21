import IBuildingData from "./BuildingData";

export default interface ITownData {
  lastTick: number;
  buildings: {
    [key: string]: IBuildingData;
  };
  jobAssignments: {
    [key: string]: number;
  };
  resources: {
    [key: string]: number;
  };
}
