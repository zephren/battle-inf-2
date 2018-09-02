import IItemTypes from "../../interfaces/ItemTypes";

const itemTypes: IItemTypes = {
  plate: {
    name: "Plate Boots",
    material: "metal",
    statModifiers: {
      def: 0.2
    }
  },
  chain: {
    name: "Chain Boots",
    material: "metal",
    statModifiers: {
      def: 0.1,
      dex: 0.1
    }
  },
  cloth: {
    name: "Cloth Shoes",
    material: "cloth",
    statModifiers: {
      def: 0.1,
      mag: 0.1
    }
  }
};

export default itemTypes;
