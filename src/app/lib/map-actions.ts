import Store from "./store";

const mapState = Store.getState().mapState;

if (!mapState.values) {
  mapState.values = {};
}

function getValue(name: string): number {
  if (mapState.values[name]) {
    return mapState.values[name];
  }

  return 0;
}

function setValue(name: string, value: number) {
  mapState.values[name] = value;
}

function incrementValue(name: string) {
  const value = this.getValue(name);
  this.setValue(name, value + 1);
}

const MapActions = {
  getValue,
  setValue,
  incrementValue
};

export default MapActions;
