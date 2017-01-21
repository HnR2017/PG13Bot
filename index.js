var TelegramBot = require('node-telegram-bot-api'),

telegram = new TelegramBot("318302702:AAFFO8sSBgiphe6CYjFWTu3W_wazGALHiBQ", { polling: true });

var swear = new RegExp("fuck");
var count = 0;
var replyString = "You have sweared a total of " + count + " times.";

telegram.onText(swear, (message) => {
  telegram.sendMessage(message.chat.id, replyString);
  count++;
  console.log('count is:' + count);
  replyString = "You have sweared a total of " + count + " times.";
});