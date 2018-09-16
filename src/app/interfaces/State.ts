import CHero from "../classes/Hero";
import CBattle from "../classes/Battle";
import IItemData from "./ItemData";
import ILogEntry from "./LogEntry";

export default interface IState {
  heroes?: CHero[];
  inventory?: IItemData[];
  log?: ILogEntry[];
  scrollLogToBottom?: boolean;
  battle?: CBattle;
}
