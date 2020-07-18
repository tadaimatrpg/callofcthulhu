// Import Modules
import { CallofCthulhuActor } from "../module/actor/actor.js";
import { CallofCthulhuActorSheet } from "../module/actor/actor-sheet.js";
import { CallofCthulhuVehicleSheet } from "../module/actor/vehicle-sheet.js";
import { CallofCthulhuItem } from "../module/item/item.js";
import { CallofCthulhuItemSheet } from "../module/item/item-sheet.js";
//
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
