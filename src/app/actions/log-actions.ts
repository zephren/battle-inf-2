import Store from "../store";
import CCharacter from "../classes/Character";
import ILogEntry from "../interfaces/LogEntry";
import { v4 as uuid } from "uuid";

function addLogEntry(entry: ILogEntry) {
  const state = Store.getState();
  const log = state.log;

  entry.entryId = uuid();

  log.push(entry);

  if (log.length > 100) {
    log.splice(0, log.length - 100);
  }

  state.scrollLogToBottom = true;

  Store.update();
}

export default {
  clearLog: () => {
    Store.getState().log = [];
    Store.update();
    Store.saveState();
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
  },

  addExp: (name: string, exp: number) => {
    addLogEntry({
      type: "exp",
      data: {
        name: name,
        exp: exp
      }
    });
  }
};
