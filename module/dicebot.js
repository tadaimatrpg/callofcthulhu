import { CallofCthulhu } from './config.js'
/**
 *CallofCthulhu(7thEd.) Define your own commands
 *Here, we receive the chat Messages and determine each command.
 *[/CC or /CC(x)]Define a command to judge a normal dice (bonus penalty).
 *[/CBR] Command to define the decision on combination rolls.
*/
Hooks.on("chatMessage", (html,content) => {

    let rgx;
    rgx = /(\S+)/g;
    let commands = content.match(rgx);
    let command = commands[0];
    let m = 0;
    let s = 0;
    let res = "<h1>Error</h1>";
    let r = new Roll("1d100"); //Normal Dice
    let r2 = new Roll("1d10"); //r2 and r3 are used to determine bonus penalties
    let r3 = new Roll("1d10");
   //Perform processing for each command.
   if(command === "/CC" || command === "/cc"){
    rgx = /(?:[0-9]+)/;   
    commands = content.match(rgx);
    m = commands[0];
    r.roll();
    s = r.result;
    if(s <= 1) res = game.i18n.localize("CallofCthulhu.dicebotCritical");
    else if(s >= 100) res= game.i18n.localize("CallofCthulhu.dicebotFumble");
    else if(s <= (m/5)) res= game.i18n.localize("CallofCthulhu.dicebotExtreme");
    else if(s <= (m/2)) res= game.i18n.localize("CallofCthulhu.dicebotHard");
    else if(s <= m) res= game.i18n.localize("CallofCthulhu.dicebotRegular");
    else if(s >= 96){if(m < 50) res= game.i18n.localize("CallofCthulhu.dicebotFumble"); 
    else res= game.i18n.localize("CallofCthulhu.dicebotFail");}
    else res= game.i18n.localize("CallofCthulhu.dicebotFail");
    res += (game.i18n.localize("CallofCthulhu.dicebotSkill") + m);
    r.toMessage(
        {speaker: ChatMessage.getSpeaker(),
        flavor: res,
        });
        return false;
    }
})