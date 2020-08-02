/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {TnkSheet}
 */

export class CallofCthulhuVehicleSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
    classes: ["CallofCthulhu",  "sheet", "vehicle"],
      template: "systems/callofcthulhu/templates/actor/vehicle-sheet.html",
      width: 600,
      height: 500,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }],
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
setPosition(options={}) {
  const position = super.setPosition(options);
  const sheetBody = this.element.find(".sheet-body");
  const bodyHeight = position.height - 192;
  sheetBody.css("height", bodyHeight);
  return position;
}

/* -------------------------------------------- */

}
 

 

