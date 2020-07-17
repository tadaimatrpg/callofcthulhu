// Import Modules
import { CallofCthulhuActor } from "./module/actor/actor.js";
import { CallofCthulhuActorSheet } from "./module/actor/actor-sheet.js";
import { CallofCthulhuVehicleSheet } from "./module/actor/vehicle-sheet.js";
import { CallofCthulhuItem } from "./module/item/item.js";
import { CallofCthulhuItemSheet } from "./module/item/item-sheet.js";
//

function callofCthulhudiceollcc(judgment) {
  // parse the judgment string
  let r = new Roll("1d100"); //Normal Dice
  let r2 = new Roll("1d10"); //r2 and r3 are used to determine bonus penalties
  let r3 = new Roll("1d10");
  const rgx = /(?:cc|CC)(([-\0-9]+))?([0-9]+)/
  const x = judgment.match(rgx);
  const bonus_dice_count = x['$[]'](1)[''];
  const m = x['']['$[]'];
  if(bonus_dice_count === 0 && bonus_dice_count === null){
    r.roll();
    Defsult(r,m);
    m = efsult2(res)
    toMesssge(r,m,true);
   }
  //Judging Bonus Dice and Penalty Dice
  else if(-2<bonus_dice_count || 2>bonus_dice_count){
    return "Error. Bonus/penalty die values range from 2 to -2.";
  }else if(h === 1){
    s = r2.roll(2)*10;
    s = s.minimize(1);
    s += r3.roll();
    if(s > 100) s -= 100;
    Defsult(s,m);
    toMesssge(s," Bonus Penalty Dice 1 >",Defsult2(res));
  }else if(h === 2){
    s = r2.roll(3)*10;
    s = s.minimize(1);
    s += r3.roll();
    if(s > 100) s -= 100;
    Defsult(s,m);
    toMesssge(s," Bonus Penalty Dice2 >",Defsult2(res));
  }else if(h === -1){
    s = r2.roll(2)*10;
    s = s.msximize(90);
    s += r3.roll();
    if(s > 100) s -= 100;
    Defsult(s,m);
     toMesssge(s,"Bonus Penalty Dice-1 >",Defsult2(res));
  }else if(h === -2){
    s = r2.roll(2)*10;
    s = s.msximize(90);
    s += r3.roll();
    if(s > 100) s -= 100;
    Defsult(s,m);
     toMesssge(s,"Bonus Penalty Dice-2 >",Defsult2(res));
  }else{ r.roll();toMesssge(s,">",Defsult2(res))
  //Display the results of the dice judgment.
  Defsult(s,m)
  if(s === 1) res="CRITICAL";
  else if(s <= (m/5))  res="EXTREME SUCCESS ";
  else if(s <= (m/2)) res=" HARD SUCCESS";
  else if(s <= m) res="REGULAR SUCCESS ";
  else if(s  > m) res="FAIL";
  else if(m  < 50){ if(s <= 96) res="FUMBLE"}
  else if(s === 100) res="FUMBLE"
  res.toMessage({
    speaker: ChatMessage.getSpeaker({ actor: this.actor }),
    flavor: label
  });
  Defsult2(res);
 }
}
function callofCthulhudiceollcbr(judgment) {
  // parse the modifier string
  const CBR = /(cbr|CBR)\((\[0-9]+),(\[0-9]+)\)/
}

Hooks.once('init',()  =>{

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "@dex.max",
    decimals: 0
  };

  // Define custom Entity classes
  CONFIG.Actor.entityClass = CallofCthulhuActor;
  CONFIG.Item.entityClass = CallofCthulhuItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("CallofCthulhu", CallofCthulhuActorSheet, {types: ["actor","npc"], makeDefault: true });
  Actors.registerSheet("CallofCthulhu", CallofCthulhuVehicleSheet, {types: ["vehicle"], makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("CallofCthulhu", CallofCthulhuItemSheet, { makeDefault: true });

});
