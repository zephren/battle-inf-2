export default {
  name: "Sawmill",
  description: "Used to turn wood into planks",
  availableIf: () => {
    return true;
  },
  upgradeCost: (buildingData: any) => {
    return {
      lumber: (buildingData.quality + 1) * 200
    };
  },
  expandCost: (buildingData: any) => {
    return {
      lumber: (buildingData.size + 1) * 200
    };
  }
};
