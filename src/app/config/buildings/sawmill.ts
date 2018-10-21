export default {
  name: "Sawmill",
  description: "Used to turn wood into planks",
  availableIf: () => {
    return true;
  },
  cost: (level: number) => {
    return {
      lumber: (level + 1) * 200
    };
  }
};
