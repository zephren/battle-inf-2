export default {
  name: "Inn",
  description: "A place for passing heroes to rest",
  availableIf: () => {
    return true;
  },
  cost: (level: number) => {
    return {
      lumber: (level + 1) * 1000
    };
  }
};
