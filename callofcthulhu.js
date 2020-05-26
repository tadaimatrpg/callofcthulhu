// Import Modules
import { CallofCthulhuActor } from "./module/actor/actor.js";
import { CallofCthulhuActorSheet } from "./module/actor/actor-sheet.js";
import { CallofCthulhuItem } from "./module/item/item.js";
import { CallofCthulhuItemSheet } from "./module/item/item-sheet.js";
//

Hooks.once('init', async function() {

  game.CallofCthulhu = {

    CallofCthulhuActor,
    CallofCthulhuItem
  };
 
  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };

  // Define custom Entity classes
  CONFIG.Actor.entityClass = CallofCthulhuActor;
  CONFIG.Item.entityClass = CallofCthulhuItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("CallofCthulhu", CallofCthulhuActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("CallofCthulhu", CallofCthulhuItemSheet, { makeDefault: true });

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });
});
