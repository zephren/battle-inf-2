export default function(context: any) {
  const hero = context.hero;
  const battle = context.battleApi;

  var target = battle.targetOpponent();
  battle.attack(target);
}
