const Discord = require('discord.js');

module.exports = {
    name: 'creator',
    description: 'Credits the author.',
    cooldown: 5,
    execute(message) {
        const creatorEmbed = new Discord.MessageEmbed()
        .setColor('#ff00ff')
        .setTitle('Bot Creator')
        .setAuthor('Sorin#0360', 'https://i.imgur.com/3CuJe17.png')
        .setDescription('This project has made me want to murder people.\nI hope you enjoy the bot!');
    message.channel.send(creatorEmbed)
    },
}