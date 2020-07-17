/**
 *CallofCthulhu(7thEd.) Define your own commands
 *Here, we receive the chat Messages and determine each command.
 *[/CC or /CC(x)]Define a command to judge a normal dice (bonus penalty).
 *[/CBR] Command to define the decision on combination rolls.
*/
Hooks.on("chatMessage", (content) => {
    let r = new Roll("1d100"); //Normal Dice
    let r2 = new Roll("1d10"); //r2 and r3 are used to determine bonus penalties
    let r3 = new Roll("1d10");
    CONFIG.Dice.rolls["CC"] = CC;
    const rgx = /(\S+)/g;
    const m = 0;
    const s = 0;
    const res = "Error";
    let command = content.match(rgx);
    // let command = commands[0];
   //Perform processing for each command.
   if(command === "/CC" || command === "/cc"){
    rgx = /(?:[0-9]+)/
    m =  content.match(rgx);
    r.roll();
    if(r === 1) res="CRITICAL";
    else if(r <= (m/5))  res="EXTREME SUCCESS ";
    else if(r <= (m/2)) res=" HARD SUCCESS";
    else if(r <= m) res="REGULAR SUCCESS ";
    else if(r  > m) res="FAIL";
    else if(m  < 50){ if(r <= 96) res="FUMBLE"}
    else if(r === 100) res="FUMBLE"
    toMesssge(r,res,true);
   }
  });