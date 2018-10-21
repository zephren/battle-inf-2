export default {
  name: "Personal Storage",
  description: "A place for storing equipment for heroes",
  availableIf: () => {
    return true;
  },
  cost: (level: number) => {
    return {
      lumber: (level + 1) * 200
    };
  }
};
