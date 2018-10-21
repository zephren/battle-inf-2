export default {
  name: "Smith",
  description: "A work space for crafting equipment",
  availableIf: () => {
    return true;
  },
  cost: (level: number) => {
    return {
      lumber: (level + 1) * 200
    };
  }
};
