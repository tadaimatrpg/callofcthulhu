/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class CallofCthulhuActor extends Actor {

  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags;

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    if (actorData.type === 'actor' || actorData.type === 'npc') this._prepareCharacterData(data);
    else if (actorData.type === 'vehicle') {
      this._prepareVehicleData(data);
    }
  }
  

  /**
   * 
   */
  _prepareCharacterData(data) {
  }
  /**
   * 
   */
  _prepareVehicleData(data) {
  }

}