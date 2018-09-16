import CCharacterData from "../../interfaces/CharacterData";

export default function(data: CCharacterData, stat: string) {
  const ratio = data.statsActual[stat] / data.statsTotal[stat];
  let s = ":b:";

  if (ratio > 0.66) {
    s = ":p:";
  } else if (ratio > 0.33) {
    s = ":i:";
  } else {
    s = ":n:";
  }

  return `${s}[${data.statsActual[stat]} / ${
    data.statsTotal[stat]
  } ${stat.toUpperCase()}]${s}`;
}
