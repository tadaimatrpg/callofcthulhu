/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class CallofCthulhuItemSheet extends ItemSheet {

  /** @override */
	static get defaultOptions() {
	  return mergeObject(super.defaultOptions, {
			classes: ["CallofCthulhu", "sheet", "item"],
			width: 200,
			height: 400,
		});
  }

   /** @override */
   get template() {
    const path = "systems/callofcthulhu/templates/item";
    // Return a single sheet for all item types.
    return `${path}/dis-sheet.html`;
    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.html`.

    // return `${path}/${this.item.data.type}-sheet.html`;
  }
  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    return data;
  }

  /* -------------------------------------------- */

  /** @override */
	activateListeners(html) {
    super.activateListeners(html);

    html.find('.rollable').click(this._onRoll.bind(this));
  
  }

  /* -------------------------------------------- */
  /**
 * Handle clickable rolls.
 * @param {Event} event   The originating click event
 * @private
 */
_onRoll(event) {
  event.preventDefault();
  const element = event.currentTarget;
  const dataset = element.dataset;
  const bonus_dice_count =dataset.sper;
  if(element === null) element+0;
   if (bonus_dice_count.roll) {
  //   let roll = new Roll(dataset.roll, this.itme.data.data);
    //Set the normal roll and bonus/penalty roll
    let r = new Roll("1d100"); //Normal Dice
    let r2 = new Roll("1d10 - 1"); //r2 and r3 are used to determine bonus penalties
    let r3 = new Roll("1d10 * 10 - 10");
    if(element === 0){
      r.roll().toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label
      });;
    console.log(r.total);
  }
  //Judging Bonus Dice and Penalty Dice
  else if(-2<element || 2>element){
    error("Error. Bonus/penalty die values range from 2 to -2.",dis)
  }else if(element === 1){
    s = minimize(r3.reroll()+r2.roll());
    if(s === 0) s = s + 100;
    Defsult(s,dataset);
    toMesssge(s," Bonus Penalty Dice 1 >",Defsult2(res));
  }else if(element === 2){
    s = minimize(r3.reroll()&&r3.roll()+r2.roll());
    if(s === 0) s = s + 100;
    Defsult(s,dataset);
    toMesssge(s," Bonus Penalty Dice2 >",Defsult2(res));
  }else if(h === -1){
    s = msximize(r3.reroll()+r2.roll());
    if(s === 0) s = s + 100;
    Defsult(s,dataset);
     toMesssge(s,"Bonus Penalty Dice-1 >",Defsult2(res));
  }else if(h === -2){
    s = msximize(r3.reroll()||r3.roll()+r2.roll());
    if(s === 0) s = s + 100;
    Defsult(s,dataset);
     toMesssge(s,"Bonus Penalty Dice-2 >",Defsult2(res));
     }else{ r.roll();toMesssge(s,">",Defsult2(res))
     //Display the results of the dice judgment.
      Defsult(s,dataset)
      if(s === 1) res="CRITICAL";
      else if(s <= (dataset/5))  res="EXTREME SUCCESS ";
      else if(s <= (dataset/2)) res=" HARD SUCCESS";
      else if(s <= dataset) res="REGULAR SUCCESS ";
      else if(s  > dataset) res="FAIL";
      else if(dataset  < 50){ if(s <= 96) res="FUMBLE"}
      else if(s === 100) res="FUMBLE"
      res.toMessage({
     speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: label
       });
     Defsult2(res);
    }
  }
}
}
