const Discord = require('discord.js');

module.exports = {
    name: 'admin-test',
    description: 'Tests if a user has permission to run admin commands.',
    guildOnly: true,
    cooldown: 5,
    execute(message) {
        const member = message.member;
        if (member.hasPermission('MANAGE_ROLES')) {
            message.channel.send("You have access to admin commands.");
        } else {
            message.channel.send("You do not have access to admin commands.");
        }
    },
}