import IItemTypes from "../../interfaces/ItemTypes";

const itemTypes: IItemTypes = {
  plate: {
    name: "Plate Healmet",
    material: "metal",
    statModifiers: {
      def: 0.4
    }
  },
  chain: {
    name: "Chain Helmet",
    material: "metal",
    statModifiers: {
      def: 0.2,
      dex: 0.2
    }
  },
  cloth: {
    name: "Cloth Helmet",
    material: "cloth",
    statModifiers: {
      def: 0.2,
      mag: 0.2
    }
  }
};

export default itemTypes;
