export default {
  name: "Housing",
  description: "A place for heroes and residents to live",
  availableIf: () => {
    return true;
  },
  cost: (level: number) => {
    return {
      lumber: (level + 1) * 200
    };
  }
};
