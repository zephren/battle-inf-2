export default interface IStats {
  [key: string]: number;
  hp: number;
  sp: number;
  atk: number;
  def: number;
  dex: number;
  mag: number;
}

export function createStats(): IStats {
  return {
    hp: 0,
    sp: 0,
    atk: 0,
    def: 0,
    dex: 0,
    mag: 0
  };
}

const count = Object.keys(createStats()).length;

export function statCount() {
  return count;
}

export function cloneStats(stats: IStats): IStats {
  return JSON.parse(JSON.stringify(stats));
}
