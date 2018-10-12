import IItemTypes from "../../interfaces/ItemTypes";

const itemTypes: IItemTypes = {
  plate: {
    name: "Plate Leggings",
    material: "metal",
    statModifiers: {
      def: 0.4
    }
  },
  chain: {
    name: "Chain Leggings",
    material: "metal",
    statModifiers: {
      def: 0.2,
      dex: 0.2
    }
  },
  cloth: {
    name: "Cloth Leggings",
    material: "cloth",
    statModifiers: {
      def: 0.2,
      mag: 0.2
    }
  }
};

export default itemTypes;
