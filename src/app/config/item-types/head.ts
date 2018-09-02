import IItemTypes from "../../interfaces/ItemTypes";

const itemTypes: IItemTypes = {
  plate: {
    name: "Plate Healmet",
    material: "metal",
    statModifiers: {
      def: 0.5
    }
  },
  chain: {
    name: "Chain Helmet",
    material: "metal",
    statModifiers: {
      def: 0.3,
      dex: 0.2
    }
  },
  cloth: {
    name: "Cloth Helmet",
    material: "cloth",
    statModifiers: {
      def: 0.2,
      mag: 0.3
    }
  }
};

export default itemTypes;
