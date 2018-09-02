interface IItemType {
  name: string;
  material: string;
  slots?: number;
  statModifiers: {
    [key: string]: number;
    hp?: number;
    sp?: number;
    atk?: number;
    def?: number;
    dex?: number;
    mag?: number;
  };
}

export default interface IItemTypes {
  [key: string]: IItemType;
}
