import IItemTypes from "../../interfaces/ItemTypes";

const itemTypes: IItemTypes = {
  plate: {
    name: "Plate Armor",
    material: "metal",
    statModifiers: {
      def: 0.6
    }
  },
  chain: {
    name: "Chain Armor",
    material: "metal",
    statModifiers: {
      def: 0.4,
      dex: 0.2
    }
  },
  cloth: {
    name: "Cloth Armor",
    material: "cloth",
    statModifiers: {
      def: 0.2,
      mag: 0.4
    }
  }
};

export default itemTypes;
