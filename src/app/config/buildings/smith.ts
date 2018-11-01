export default {
  name: "Smith",
  description: "A work space for crafting equipment",
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
