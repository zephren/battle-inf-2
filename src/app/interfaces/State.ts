import CCharacter from "../classes/Character";
import CBattle from "../classes/Battle";
import IItemData from "./ItemData";
import ILogEntry from "./LogEntry";
import ITownData from "./TownData";
import IProperties from "./Properties";

export default interface IState {
  heroes?: CCharacter[];
  inventory?: IItemData[];
  newItemActionCode?: string;
  currentLocation?: string;
  properties?: IProperties;
  log?: ILogEntry[];
  scrollLogToBottom?: boolean;
  battle?: CBattle;
  battleInfinite?: boolean;
  town?: ITownData;
  mapState?: any;
}
