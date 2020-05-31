module.exports = {
    name: 'server',
    description: 'Lists the server name.',
    guildOnly: true,
    cooldown: 5,
    execute(message) {
        message.channel.send(`We are in ${message.guild.name}`);
    },
}