import Store from "./store";

export default {
  saveState: () => {
    localStorage.setItem("saveState", JSON.stringify(Store.getState()));
  }
};
