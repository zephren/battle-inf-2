export default {
  name: "Storage",
  description: "A place to store items found in battle",
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
