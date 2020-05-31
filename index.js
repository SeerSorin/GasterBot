const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    // Creator command, which I think is super neat. Baby's first command!
    if (message.content === '${prefix}creator') {
        message.channel.send('I was created by Sorin#0360.');
    } else if (message.content.startsWith(`${prefix}Gaster`)) {
        message.channel.send('It\'s rude to talk about someone who\'s listening.');
    }
});

client.login(token)