import Store from "../../store";

function inventorySize() {
  const town = Store.getState().town;
  return town.buildings.storage.size * 10;
}

export default {
  inventorySize
};
