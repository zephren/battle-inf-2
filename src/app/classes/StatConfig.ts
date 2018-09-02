interface Stat {
  displayName: string;
}

interface StatConfig {
  [key: string]: Stat;
  hp: Stat;
  sp: Stat;
  atk: Stat;
  def: Stat;
  dex: Stat;
  mag: Stat;
}

const statNames: StatConfig = {
  hp: { displayName: "HP" },
  sp: { displayName: "SP" },
  atk: { displayName: "ATK" },
  def: { displayName: "DEF" },
  dex: { displayName: "DEX" },
  mag: { displayName: "MAG" }
};

export default statNames;
