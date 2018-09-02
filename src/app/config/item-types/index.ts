import IItemTypes from "../../interfaces/ItemTypes";
import body from "./body";
import feet from "./feet";
import hand from "./hand";
import hands from "./hands";
import head from "./head";
import legs from "./legs";

interface IAllItemTypes {
  [key: string]: IItemTypes;
}

const allItemTypes: IAllItemTypes = {
  body,
  feet,
  hand,
  hands,
  head,
  legs
};

export default allItemTypes;
