import IBuildingData from "./BuildingData";

export default interface ITownData {
  buildings: {
    [key: string]: IBuildingData;
  };
}
