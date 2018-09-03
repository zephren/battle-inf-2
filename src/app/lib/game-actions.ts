import Store from "./store";

export default {
  saveState: {
    name: "Save State",
    action: () => {
      localStorage.setItem("saveState", JSON.stringify(Store.getState()));
    }
  }
};
