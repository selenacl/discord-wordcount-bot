const Discord = require('discord.js');
const getMessages = require('./fetchAllMessages.js');
const bot = new Discord.Client();
require('dotenv').config();

const token = process.env.TOKEN;
const PREFIX = '!';
const LIMIT = 2500;


// ONLINE MESSAGE
bot.on('ready', () => {
  console.log('AntwonBot is online!');
});

bot.on('message', (message) => {
  if (message.content.toLowerCase().includes('wylin')) {
    message.channel.sendMessage('wew lad');
  }
})
// COMMANDS
bot.on('message', msg => {

  if(!msg.content.startsWith(PREFIX)) { return; }

  let args = msg.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case 'wc':
      if (args[1]) {
        // fetch all messages
        getMessages.fetchAllMessages(msg.channel, LIMIT)
          .then(msgs => {
            // save only info needed
            let allMessages = [];
            msgs.array().forEach(m => {
              allMessages.push({ content: m.content.toLowerCase(), author: m.author.username });
            });

            // count times argument typed, aside from in commands or bot replies
            let wordCount = 0;
            allMessages.forEach((message) => {
              if (message.content.includes(args[1].toLowerCase())
                && !message.content.includes("!wc")
                && (message.author !== 'AntwonBot')) {
                wordCount++;
              }
            });

            msg.channel.sendMessage(`"${args[1].toLowerCase()}" said ${wordCount} message(s) recently.`);
          })
          .catch(err => console.log(err));

      } else {
        msg.channel.sendMessage('A second argument is required.');
      }
      break;

    case 'vanjie':
      msg.channel.sendMessage('```' + process.env.VANJIE + '```');
      break;

    case 'surejan':
      msg.channel.send("", { files: ["https://media.giphy.com/media/1AIeYgwnqeBUxh6juu/giphy.gif"] });
      break;

    case 'eyeroll':
      msg.channel.send("", {files: ["./assets/eyeroll.jpg"]});
      break;

    case 'ohok':
      msg.channel.send("", {files: ["./assets/ohok.mp4"]});
      break;

    case 'fat':
      msg.channel.send("", {files: ["./assets/fat.jpg"]});
      break;

    case 'um':
      msg.channel.send("", {files: ["./assets/um.jpg"]});
      break;

    case 'time':
      const date = new Date();
      const hour = date.getHours();

      if ((hour == 3) || (hour == 4)) {
        msg.channel.send('um, go to sleep');
      } else if ((hour >= 5) && (hour <= 10)) {
        msg.channel.send('RiSe AnD sHiNe');
      } else if ((hour >= 11) && (hour <= 18)) {
        msg.channel.send(process.env.WORK);
      } else if ((hour >= 19) || (hour <= 2)) {
        msg.channel.send('Good night, abuela. AND PARTY TIME, MOTHER!!!');
      }

      break;

    case 'oop':
      msg.channel.send("", { files: ["https://media.giphy.com/media/KDbi6mOb2O73HHs0xg/giphy.gif"] });
      break;

    case 'help':
      msg.channel.sendMessage(`Use: '!wc yourWordHere' to search how many times you have used that word.`);
      break;

    case 'testing':
      msg.channel.sendMessage(`testing`);
      break;

    case 'commands':
      msg.channel.sendMessage(`!help, !commands, !wc yourWordHere, !vanjie, !ohok, !oop, !time, !eyeroll, !surejan, !fat, !um`);
      break;


  }
})

bot.login(token);