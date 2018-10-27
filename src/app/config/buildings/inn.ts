import CCharacter from "../../classes/Character";

export default {
  name: "Inn",
  description: "A place for passing heroes to rest",
  availableIf: () => {
    return true;
  },
  cost: (level: number) => {
    return {
      lumber: (level + 1) * 1000
    };
  },
  tickTime: 600000,
  processTick: (town: any, building: any) => {
    const heroes = [];

    for (let i = 0; i < building.quantity; i++) {
      heroes.push(CCharacter.createHero());
    }

    building.data.heroes = heroes;
  }
};
