const Discord = require('discord.js');
const getMessages = require('./fetchAllMessages.js');
const bot = new Discord.Client();
require('dotenv').config();

const token = process.env.TOKEN;
const PREFIX = '!';
const LIMIT = 100000;

// ONLINE MESSAGE
bot.on('ready', () => {
  console.log('AntwonBot is online!');
});

// COMMANDS
bot.on('message', msg => {

  let args = msg.content.substring(PREFIX.length).split(" ");

  switch(args[0]) {
    case 'wc': 
      if(args[1]) {
        // fetch all messages
        getMessages.fetchAllMessages(msg.channel, LIMIT)
          .then(msgs => {
            // save only info needed
            let allMessages = [];
            msgs.array().forEach(m => {
              allMessages.push({content: m.content.toLowerCase(), author: m.author.username});
            });

            // count times argument typed, aside from in commands or bot replies
            let wordCount = 0;
            allMessages.forEach((message)=> {
              if(message.content.includes(args[1].toLowerCase())
                  && !message.content.includes("!wc")
                  && (message.author !== 'AntwonBot')) {
                wordCount++;
              }
            });

            msg.channel.sendMessage(`"${args[1].toLowerCase()}" said ${wordCount} time(s).`);
          })
        .catch(err => console.log(err));

      } else {
        msg.channel.sendMessage('A second argument is required.');
      }
      break;

    case 'help':
        msg.channel.sendMessage(`Use: '!wc yourWordHere' to search how many times you have used that word.`);
        break;

    case 'commands':
        msg.channel.sendMessage(`!help, !commands, !wc yourWordHere`);
  }
})

bot.login(token);