const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    // Creator command, which I think is super neat. Baby's first command!
    if (message.content === '!creator') {
        message.channel.send('I was created by Sorin#0360.');
    }
});
