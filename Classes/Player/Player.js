const Vector3 = require("../Vector3");

module.exports = class Player{
  constructor(){
    this.UID = new String('');
    this.displayName = new String('');
    this.email = new String('');

    this.position = new Vector3(0, 0, 0);

    this.health = new Number(0);
    this.mana = new Number(0);
    this.stamina = new Number(0);
    this.level = new Number(0);
    this.XP = new Number(0);
    this.metaXP = new Number(0);
    this.skillPointsCurrent = new Number(0);
    this.skillPoints = {
      spAgility: new Number(0),
      spLife: new Number(0),
      spResistance: new Number(0),
      spForce: new Number(0),
      spStamina: new Number(0),
      spDamage: new Number(0),
    };
  }
}