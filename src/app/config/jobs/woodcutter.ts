import Store from "../../lib/store";
import gameFunctions from "../../lib/game-functions";

export default {
  name: "Woodcutter",
  description: "Cuts wood into into planks",
  isAvailable: (town: any) => {
    return true;
  },
  canAssign: (town: any) => {
    return true;
  },
  tick: (town: any, quantity: number) => {
    const removedAmount = gameFunctions.removeTownResource("wood", quantity);
    gameFunctions.addTownResource("lumber", removedAmount);
  }
};
