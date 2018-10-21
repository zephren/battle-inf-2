import IJob from "../../interfaces/Job";
import forester from "./forester";
import woodcutter from "./woodcutter";

const config: {
  [key: string]: IJob;
} = {
  forester,
  woodcutter
};

export default config;
