/**
 *CallofCthulhu(7thEd.) Define your own commands
 *Here, we receive the chat Messages and determine each command.
 *[/CC]Define a command to judge a normal dice.
 *[/CC-2~2] -2 to 2 bonuses and penalty dice implemented (buggy).
 *[/CBR] Command to define the decision on combination rolls.
*/
Hooks.on("chatMessage", (html,content) => {
//Read the command
    let rgx;
    rgx = /(\S+)/g;
    let commands = content.match(rgx);
    let command = commands[0];

//Declare the dice to be used.
    //Define a function to read the value
    let m = 0;
    let n = 0;
    let s = 0;
    let s2 = 0;
    let s3 = 0;

    //Define errors as debugging.
    let res = "<h1>Error</h1>";
    
    //Normal Dice
    let r = new Roll("1d100");
    //r2 are used to determine bonus penalties 
    let r2 = new Roll("1d10*10");
    let r3 = new Roll("1d10*10");
    let r4 = new Roll("1d10*10");
    let r5 = new Roll("1d8 + @pot",{pot:s3});

   //Perform processing for each command.
   if(command === "/CC" || command === "/cc"){
    //This time, extract only the numbers.
    rgx = /(?:[0-9]+)/g;   
    commands = content.match(rgx);
    m = commands[0];

    //Determination based on rolls and readings
    r.roll();
    //Put the result of the die into s as a number rather than an object.
    s = r.result;
    if(s <= 1) res = game.i18n.localize("CallofCthulhu.dicebotCritical");
    else if(s >= 100) res= game.i18n.localize("CallofCthulhu.dicebotFumble");
    else if(s <= (m/5)) res= game.i18n.localize("CallofCthulhu.dicebotExtreme");
    else if(s <= (m/2)) res= game.i18n.localize("CallofCthulhu.dicebotHard");
    else if(s <= m) res= game.i18n.localize("CallofCthulhu.dicebotRegular");
    else if(s >= 96){if(m < 50) res= game.i18n.localize("CallofCthulhu.dicebotFumble"); 
    else res= game.i18n.localize("CallofCthulhu.dicebotFail");}
    else res= game.i18n.localize("CallofCthulhu.dicebotFail");

    //The resulting output.
    res += (game.i18n.localize("CallofCthulhu.dicebotSkill") + m);
    r.toMessage(
        {speaker: ChatMessage.getSpeaker(),
        flavor: res,
        });
    //return to avoid errors in the command.
        return false;
    }


    //Bonus & Penalty Dice
    if(command === "/CC1" || command === "/cc1"){
        //This time, extract only the numbers.
        rgx = /(?:[0-9]+[0-9]+)/g;   
        commands = content.match(rgx);
        m = commands[0];
    
        //Determination based on rolls and readings
        r2.roll();
        r3.roll();

        //Put the result of the die into s as a number rather than an object.
        s2 = r2.total;
        s3 = r3.total;

        //If the number is 100, it is automatically set to 0
        if(s3 >= 100) s3 = 0;
        if(s2 >= 100) s2 = 0;

        if(s2 < s3) s3 = s2;

        //Dice roll for 10-sided die numbers. It is then quantified.
        r5 = new Roll("1d10 + @pot",{pot:s3});
        r5.roll();
        s = r5.total;

         //If a 100-sided die is 100 and a 10-sided die yields a 10, it is a 100 fumble.
         if(s >= (10 + s3) && s3 <= 0){s = 100; r5 = new Roll("@pot",{pot:100});}

        //If a 10-sided die rolls a 10, it is automatically set to 0.
        else if(s >= (10 + s3)){r5 = new Roll("@pot + @s",{s:0,pot:s3}); r5.roll(); s = r5.total;}

        if(s <= 1) res = game.i18n.localize("CallofCthulhu.dicebotCritical");
        else if(s >= 100) res= game.i18n.localize("CallofCthulhu.dicebotFumble");
        else if(s <= (m/5)) res= game.i18n.localize("CallofCthulhu.dicebotExtreme");
        else if(s <= (m/2)) res= game.i18n.localize("CallofCthulhu.dicebotHard");
        else if(s <= m) res= game.i18n.localize("CallofCthulhu.dicebotRegular");
        else if(s >= 96){if(m < 50) res= game.i18n.localize("CallofCthulhu.dicebotFumble"); 
        else res= game.i18n.localize("CallofCthulhu.dicebotFail");}
        else res= game.i18n.localize("CallofCthulhu.dicebotFail");
    
        //The resulting output.

        let rollChatData1 = {
            type: CONST.CHAT_MESSAGE_TYPES.ROLL,
            roll: r2
          };
        let rollChatData2 = {
            type: CONST.CHAT_MESSAGE_TYPES.ROLL,
            roll: r3
          };
    
          ChatMessage.create(rollChatData1);
          ChatMessage.create(rollChatData2);

        res += (game.i18n.localize("CallofCthulhu.dicebotSkill") + m);
        r5.toMessage(
            {speaker: ChatMessage.getSpeaker(),
            flavor: res,
            });
        //return to avoid errors in the command.
            return false;
        }

        if(command === "/CC-1" || command === "/cc-1"){
            //This time, extract only the numbers.
            rgx = /(?:[0-9]+[0-9]+)/g;    
            commands = content.match(rgx);
            m = commands[0];
        
            //Determination based on rolls and readings
            r2.roll();
            r3.roll();
    
            //Put the result of the die into s as a number rather than an object.
            s2 = r2.total;
            s3 = r3.total;
    
            //If the number is 100, it is automatically set to 0
            if(s3 >= 100) s3 = 0;
            if(s2 >= 100) s2 = 0;
    
            if(s2 > s3) s3 = s2;
    
            //Dice roll for 10-sided die numbers. It is then quantified.
            r5 = new Roll("1d10 + @pot",{pot:s3});
            r5.roll();
            s = r5.total;
    
             //If a 100-sided die is 100 and a 10-sided die yields a 10, it is a 100 fumble.
             if(s >= (10 + s3) && s3 <= 0){s = 100; r5 = new Roll("@pot",{pot:100});}
    
            //If a 10-sided die rolls a 10, it is automatically set to 0.
            else if(s >= (10 + s3)){r5 = new Roll("@pot + @s",{s:0,pot:s3}); r5.roll(); s = r5.total;}
    
            if(s <= 1) res = game.i18n.localize("CallofCthulhu.dicebotCritical");
            else if(s >= 100) res= game.i18n.localize("CallofCthulhu.dicebotFumble");
            else if(s <= (m/5)) res= game.i18n.localize("CallofCthulhu.dicebotExtreme");
            else if(s <= (m/2)) res= game.i18n.localize("CallofCthulhu.dicebotHard");
            else if(s <= m) res= game.i18n.localize("CallofCthulhu.dicebotRegular");
            else if(s >= 96){if(m < 50) res= game.i18n.localize("CallofCthulhu.dicebotFumble"); 
            else res= game.i18n.localize("CallofCthulhu.dicebotFail");}
            else res= game.i18n.localize("CallofCthulhu.dicebotFail");
        
            //The resulting output.
    
            let rollChatData1 = {
                type: CONST.CHAT_MESSAGE_TYPES.ROLL,
                roll: r2
              };
            let rollChatData2 = {
                type: CONST.CHAT_MESSAGE_TYPES.ROLL,
                roll: r3
              };
        
              ChatMessage.create(rollChatData1);
              ChatMessage.create(rollChatData2);
    
            res += (game.i18n.localize("CallofCthulhu.dicebotSkill") + m);
            r5.toMessage(
                {speaker: ChatMessage.getSpeaker(),
                flavor: res,
                });
            //return to avoid errors in the command.
                return false;
            }

            if(command === "/CC2" || command === "/cc2"){
                //This time, extract only the numbers.
                rgx = /(?:[0-9]+[0-9]+)/g;    
                commands = content.match(rgx);
                m = commands[0];
            
                //Determination based on rolls and readings
                r2.roll();
                r3.roll();
                r4.roll();
                //Quantify the total value of a hundred-sided die.
                s = r2.total;
                s2 = r3.total;
                s3 = r4.total;
        
               //If the number is 100, it is automatically set to 0
               if(s3 >= 100) s3 = 0;
               if(s2 >= 100) s2 = 0;
               if(s >= 100) s = 0;
        
               if(s < s2) s2 = s;
               if(s < s3) s3 = s;   
               if(s2 < s3) s3 = s2;
        
                //Dice roll for 10-sided die numbers. It is then quantified.
                r5 = new Roll("1d10 + @pot",{pot:s3});
                r5.roll();
                s = r5.total;
        
                 //If a 100-sided die is 100 and a 10-sided die yields a 10, it is a 100 fumble.
                 if(s >= (10 + s3) && s3 <= 0){s = 100; r5 = new Roll("@pot",{pot:100});}
        
                //If a 10-sided die rolls a 10, it is automatically set to 0.
                else if(s >= (10 + s3)){r5 = new Roll("@pot + @s",{s:0,pot:s3}); r5.roll(); s = r5.total;}
        
                if(s <= 1) res = game.i18n.localize("CallofCthulhu.dicebotCritical");
                else if(s >= 100) res= game.i18n.localize("CallofCthulhu.dicebotFumble");
                else if(s <= (m/5)) res= game.i18n.localize("CallofCthulhu.dicebotExtreme");
                else if(s <= (m/2)) res= game.i18n.localize("CallofCthulhu.dicebotHard");
                else if(s <= m) res= game.i18n.localize("CallofCthulhu.dicebotRegular");
                else if(s >= 96){if(m < 50) res= game.i18n.localize("CallofCthulhu.dicebotFumble"); 
                else res= game.i18n.localize("CallofCthulhu.dicebotFail");}
                else res= game.i18n.localize("CallofCthulhu.dicebotFail");
            
                //The resulting output.
        
                let rollChatData1 = {
                    type: CONST.CHAT_MESSAGE_TYPES.ROLL,
                    roll: r2
                  };
                let rollChatData2 = {
                    type: CONST.CHAT_MESSAGE_TYPES.ROLL,
                    roll: r3
                  };
                  let rollChatData3 = {
                    type: CONST.CHAT_MESSAGE_TYPES.ROLL,
                    roll: r4
                  };
        
                
            
                  ChatMessage.create(rollChatData1);
                  ChatMessage.create(rollChatData2);
                  ChatMessage.create(rollChatData3);
                res += (game.i18n.localize("CallofCthulhu.dicebotSkill") + m);
                r5.toMessage(
                    {speaker: ChatMessage.getSpeaker(),
                    flavor: res,
                    });
                //return to avoid errors in the command.
                    return false;
                }

                if(command === "/CC-2" || command === "/cc-2"){
                    //This time, extract only the numbers.
                    rgx = /(?:[0-9]+[0-9]+)/g;  
                    commands = content.match(rgx);
                    m = commands[0];
                
                    //Determination based on rolls and readings
                    r2.roll();
                    r3.roll();
                    r4.roll();
                    //Quantify the total value of a hundred-sided die.
                    s = r2.total;
                    s2 = r3.total;
                    s3 = r4.total;
            
                   //If the number is 100, it is automatically set to 0
                   if(s3 >= 100) s3 = 0;
                   if(s2 >= 100) s2 = 0;
                   if(s >= 100) s = 0;
            
                   if(s > s2) s2 = s;
                   if(s > s3) s3 = s;   
                   if(s2 > s3) s3 = s2;
            
                    //Dice roll for 10-sided die numbers. It is then quantified.
                    r5 = new Roll("1d10 + @pot",{pot:s3});
                    r5.roll();
                    s = r5.total;
            
                     //If a 100-sided die is 100 and a 10-sided die yields a 10, it is a 100 fumble.
                     if(s >= (10 + s3) && s3 <= 0){s = 100; r5 = new Roll("@pot",{pot:100});}
            
                    //If a 10-sided die rolls a 10, it is automatically set to 0.
                    else if(s >= (10 + s3)){r5 = new Roll("@pot+ @s",{s:0,pot:s3}); r5.roll(); s = r5.total;}
            
                    if(s <= 1) res = game.i18n.localize("CallofCthulhu.dicebotCritical");
                    else if(s >= 100) res= game.i18n.localize("CallofCthulhu.dicebotFumble");
                    else if(s <= (m/5)) res= game.i18n.localize("CallofCthulhu.dicebotExtreme");
                    else if(s <= (m/2)) res= game.i18n.localize("CallofCthulhu.dicebotHard");
                    else if(s <= m) res= game.i18n.localize("CallofCthulhu.dicebotRegular");
                    else if(s >= 96){if(m < 50) res= game.i18n.localize("CallofCthulhu.dicebotFumble"); 
                    else res= game.i18n.localize("CallofCthulhu.dicebotFail");}
                    else res= game.i18n.localize("CallofCthulhu.dicebotFail");
                
                    //The resulting output.
            
                    let rollChatData1 = {
                        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
                        roll: r2
                      };
                    let rollChatData2 = {
                        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
                        roll: r3
                      };
                      let rollChatData3 = {
                        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
                        roll: r4
                      };
                
                      ChatMessage.create(rollChatData1);
                      ChatMessage.create(rollChatData2);
                      ChatMessage.create(rollChatData3);
                    res += (game.i18n.localize("CallofCthulhu.dicebotSkill") + m);
                    r5.toMessage(
                        {speaker: ChatMessage.getSpeaker(),
                        flavor: res,
                        });
                    //return to avoid errors in the command.
                        return false;
                    }

    //I'm currently using it for testing bonus dice.
    if(command === "/CBR" || command === "/cbr"){
        //Extracting numbers from combination rolls
        rgx = /(?:[0-9]+)/g;   
        commands = content.match(rgx);
        m = commands[0];
        rgx = /(?:,[0-9]+)/g;   
        commands = content.match(rgx);
        n = commands[0].replace(/[^0-9]/g, '');
        
        //Determination based on rolls and readings
        r.roll();
        //Put the result of the die into s as a number rather than an object.
        s = r.result;
        //Determine the first number.
        if(s <= 1) res = game.i18n.localize("CallofCthulhu.dicebotCritical");
        else if(s >= 100) res= game.i18n.localize("CallofCthulhu.dicebotFumble");
        else if(s <= (m/5)) res= game.i18n.localize("CallofCthulhu.dicebotExtreme");
        else if(s <= (m/2)) res= game.i18n.localize("CallofCthulhu.dicebotHard");
        else if(s <= m) res= game.i18n.localize("CallofCthulhu.dicebotRegular");
        else if(s >= 96){if(m < 50) res= game.i18n.localize("CallofCthulhu.dicebotFumble"); 
        else res= game.i18n.localize("CallofCthulhu.dicebotFail");}
        else res= game.i18n.localize("CallofCthulhu.dicebotFail");
        //Record the first results.
        res += (game.i18n.localize("CallofCthulhu.dicebotSkill") + m);

        //Determine the second number.
        if(s <= 1) res += game.i18n.localize("CallofCthulhu.dicebotCritical");
        else if(s >= 100) res += game.i18n.localize("CallofCthulhu.dicebotFumble");
        else if(s <= (n/5)) res += game.i18n.localize("CallofCthulhu.dicebotExtreme");
        else if(s <= (n/2)) res += game.i18n.localize("CallofCthulhu.dicebotHard");
        else if(s <= n) res += game.i18n.localize("CallofCthulhu.dicebotRegular");
        else if(s >= 96){if(n < 50) res += game.i18n.localize("CallofCthulhu.dicebotFumble"); 
        else res += game.i18n.localize("CallofCthulhu.dicebotFail");}
        else res += game.i18n.localize("CallofCthulhu.dicebotFail");
        //The resulting output.
        res += (game.i18n.localize("CallofCthulhu.dicebotSkill") + n);
        r.toMessage(
            {speaker: ChatMessage.getSpeaker(),
            flavor: res,
            });
        //return to avoid errors in the command.
            return false;
        }
    })
