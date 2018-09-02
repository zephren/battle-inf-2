import CHero from "../classes/Hero";
import CItem from "../classes/Item";

export default interface IState {
  heroes?: CHero[];
  inventory?: CItem[];
}
