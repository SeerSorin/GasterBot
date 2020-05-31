module.exports = {
    name: 'prune',
    description: 'Deletes messages in bulk amounts, up to 100.',
    guildOnly: true,
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;

        // Checks if it is an integer.
        if (isNaN(ammount)) {
            return message.reply('that\'s not a valid number.');
        } else if (amount <= 1 || amount > 100) {
            return message.reply('your number is too large.')
        }
    
        // Actually delete messages.
        message.channel.bulkDelete(ammount, true).catch(err => {
            console.error(err);
            message.channel.send('There was an error trying to prune messages.\nAre you trying to delete messages older than two weeks?');
        });
    },
};