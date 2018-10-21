export default {
  name: "Training Ground",
  description: "A place to train the town's heroes",
  availableIf: () => {
    return true;
  },
  cost: (level: number) => {
    return {
      lumber: (level + 1) * 200
    };
  }
};
