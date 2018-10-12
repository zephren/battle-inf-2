import CHero from "../classes/Hero";
import CBattle from "../classes/Battle";
import IItemData from "./ItemData";
import ILogEntry from "./LogEntry";
import ITownData from "./TownData";
import IProperties from "./Properties";

export default interface IState {
  heroes?: CHero[];
  inventory?: IItemData[];
  newItemActionCode?: string;
  properties?: IProperties;
  log?: ILogEntry[];
  scrollLogToBottom?: boolean;
  battle?: CBattle;
  town?: ITownData;
}
