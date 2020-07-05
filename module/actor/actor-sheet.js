import { CallofCthulhu } from '../config.js'
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */

export class CallofCthulhuActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
    classes: ["CallofCthulhu",  "sheet", "actor"],
      template: "systems/callofcthulhu/templates/actor/actor-sheet.html",
      width: 700,
      height: 700,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }],
      dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const  data = super.getData();
    
    data.dtypes = ["String", "Number", "Boolean"];
    
    return  data;
  }

 /** @override */
 activateListeners(html) {
  super.activateListeners(html);

  // Everything below here is only needed if the sheet is editable
  if (!this.options.editable) return;

  // Add Inventory Item
  html.find('.item-create').click(this._onItemCreate.bind(this));

  // Update Inventory Item
  html.find('.item-edit').click(ev => {
    const li = $(ev.currentTarget).parents(".item");
    const item = this.actor.getOwnedItem(li.data("itemId"));
    item.sheet.render(true);
  });

  // Delete Inventory Item
  html.find('.item-delete').click(ev => {
    const li = $(ev.currentTarget).parents(".item");
    this.actor.deleteOwnedItem(li.data("itemId"));
    li.slideUp(200, () => this.render(false));
  });
}

 /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      data: data
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.data["type"];

    // Finally, create the item!
    return this.actor.createOwnedItem(itemData);
  }
/* -------------------------------------------- */

/** @override */
setPosition(options={}) {
  const position = super.setPosition(options);
  const sheetBody = this.element.find(".sheet-body");
  const bodyHeight = position.height - 192;
  sheetBody.css("height", bodyHeight);
  return position;
  }

}
 

 

