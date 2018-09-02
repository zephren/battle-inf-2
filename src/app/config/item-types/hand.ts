import IItemTypes from "../../interfaces/ItemTypes";

const itemTypes: IItemTypes = {
  sword: {
    name: "Sword",
    material: "metal",
    slots: 1,
    statModifiers: {
      atk: 0.8,
      def: 0.1,
      dex: 0.1
    }
  },
  twoHandedSword: {
    name: "Two Handed Sword",
    material: "metal",
    slots: 2,
    statModifiers: {
      atk: 0.9,
      def: 0.1
    }
  }
};

export default itemTypes;
