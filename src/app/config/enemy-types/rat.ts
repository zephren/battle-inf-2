import EnemyClasses from "../enemy-classes";

export default {
  name: "Rat",
  classes: [EnemyClasses.Normal],
  statRatios: {
    hp: [0.1, 0.2],
    sp: [0.1, 0.2],
    atk: [0.1, 0.2],
    def: [0.1, 0.2],
    dex: [0.1, 0.2],
    mag: [0.1, 0.2]
  }
};
