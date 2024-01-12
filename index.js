const mineflayer = require('mineflayer');

const botOptions = {
  host: 'server ip',
  port: 60560, // or your server's port
  username: 'playername',
  version: '1.20.1', // this is the latest version mineflayer supports
};

let bot = mineflayer.createBot(botOptions);

bot.on('login', () => {
  console.log('Bot has logged in');
  // Add any other initialization code here
});

bot.on('chat', (username, message) => {
  if (message === 'accepttp') {
    bot.chat('/tpaccept');
  }
});


bot.on('kicked', (reason) => {
  console.log(`Bot was kicked for reason: ${reason}`);
  // Attempt to reconnect after a short delay
  setTimeout(() => {
    bot = mineflayer.createBot(botOptions);
  }, 5000); // 5 seconds delay, adjust as needed
});

bot.on('entityMoved', (entity) => {
  if (entity.type === 'player' && entity.username !== bot.username) {
    // A player (other than the bot itself) is nearby, make the bot look at them
    bot.lookAt(entity.position.offset(0, entity.height, 0));
  }
});
