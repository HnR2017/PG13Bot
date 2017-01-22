var TelegramBot = require('node-telegram-bot-api'),
swearWords = require('fs').readFileSync('node_modules/swear-dict/file.txt').toString().split("\r\n").join("|"),
telegramBot = new TelegramBot("314416446:AAHq1U_WbeJCM7Vot29Ky-a6tZX9jhwOqok", { polling: true });
telegramBot = new TelegramBot("303292914:AAEabrV7m3XDyZ4I2jAC_9zHBon-5D3O7Wo", { polling: true });

var swear = new RegExp("("+swearWords+")", "i");

var summary = new RegExp("/summary", "i");
var sessions = {};

telegramBot.onText(summary, (message) => {
  var session = sessions[message.chat.id];
  var replyString = "";
  for(i in session) {
    replyString = replyString + "\n" + session[i]["name"] + " has swore " + session[i]["count"] + " times in this chat";
  }
  replyString = replyString.substring(1,replyString.lastIndexOf("\n") + 1);
  replyString = replyString + "Total swore count for this chat is " + session["total"];
  
  telegramBot.sendMessage(message.chat.id, replyString);
});

telegramBot.onText(swear, (message) => {
  /*var swearingUser = {
    id: message.from.id,
    name: message.from.first_name,
    swearCount: 1;
  }

  if (sessions.indexOf(message.chat.id) < 0) { // if new session
    sessions.push({
      userCount: 1,
      swearCount: 1,
      userList: [swearingUser]
    })
  } else { // existing session
    var currSession = sessions[sessions.indexOf(message.chat.id)];
    if (currSession["userList"].indexOf(swearingUser) < 0) { // if user list of current session doesnt have this user
      currSession["userList"].push(swearingUser);
    } else {

    }
  }*/
  if(!(message.chat.id in sessions)) {
    sessions[message.chat.id] = {};
    sessions[message.chat.id]["total"] = 0;
  }

  if(!(message.from.id in sessions[message.chat.id])) {
    sessions[message.chat.id][message.from.id] = {};
    sessions[message.chat.id][message.from.id]["count"] = 0;
    sessions[message.chat.id][message.from.id]["name"] = message.from.first_name;
  }

  sessions[message.chat.id]["total"] ++;
  sessions[message.chat.id][message.from.id]["count"] ++;
  
  replyString = sessions[message.chat.id][message.from.id]["name"] + " has swore a total of " 
          + sessions[message.chat.id][message.from.id]["count"] + " times in this chat.";
  telegramBot.sendMessage(message.chat.id, replyString);
  console.log(sessions);
});