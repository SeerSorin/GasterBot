module.exports = {
    name: 'kick',
    description: 'Kicks the user mentioned with the command.',
    guildOnly: true,
    args: true,
    usage: '<user>',
    execute(message, args) {
        // This is called a "sanity check" and I think that's funny. Anti-crash, though.
        if (!message.mentions.users.size) {
            return message.reply('you must give me a target.');
        }
        // This doesn't actually kick anyone yet.
        const taggedUser = message.mentions.users.first();
        message.channel.send(`User to shatter through space and time: ${taggedUser.username}`)  
    },
};