export default interface IJob {
  name: string;
  description: string;
  isAvailable: (town: any) => boolean;
  canAssign: (town: any) => boolean;
  tick: (town: any, quantity: number) => void;
}
