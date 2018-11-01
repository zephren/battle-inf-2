export default {
  name: "Training Ground",
  description: "A place to train the town's heroes",
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
