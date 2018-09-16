import Store from "./store";
import CCharacter from "../classes/Character";
import GameActions from "./game-actions";

function addLogEntry(entry: any) {
  const state = Store.getState();
  const log = state.log;

  log.push(entry);

  state.scrollLogToBottom = true;

  Store.update();
}

export default {
  clearLog: () => {
    Store.getState().log = [];
    Store.update();
    GameActions.saveState();
  },

  addText: (entry: string) => {
    addLogEntry({
      type: "text",
      data: {
        text: entry
      }
    });
  },

  addCharacter: (character: CCharacter) => {
    addLogEntry({
      type: "character",
      data: {
        character: character
      }
    });
  }
};
