var TelegramBot = require('node-telegram-bot-api'),

telegram = new TelegramBot("303292914:AAEabrV7m3XDyZ4I2jAC_9zHBon-5D3O7Wo", { polling: true });

var swear = new RegExp("fuck");
var count = 0;

telegram.onText(swear, (message) => {
	count++;
	var replyString = message.from.first_name + " has sweared a total of " + count + " times.";
	telegram.sendMessage(message.chat.id, replyString);
});