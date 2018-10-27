import Store from "../../store";
import gameFunctions from "../../lib/game-functions";

export default {
  name: "Forester",
  description: "Harvests trees for wood",
  isAvailable: (town: any) => {
    return true;
  },
  canAssign: (town: any) => {
    return true;
  },
  tick: (town: any, quantity: number) => {
    gameFunctions.addTownResource("wood", quantity);
  }
};
