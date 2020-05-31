const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    description: 'CLists all commands or info about specific commands.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        // Checks if it is for a specific command
        if (!args.length) {
            data.push(`Here\'s what I can do for you.`);
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command.`);

            // Sends it in a DM if it's not already there.
            return message.author.send(data, {split: true})
            .then(() => {
                if (message.channel.type == 'dm') return;
                message.reply('I\'ve sent you a DM with all of my commands.');
            })
            // Checks for errors, stops crashing..
            .catch(error => {
                console.error(`Could not send help to ${message.author.tag}.\n`, error);
                message.reply('I was unable to DM you. Are your DMs disabled?');
            });
        }

        // Checks if the command is legitimate, along with checking aliases.
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        // Responds if the command is not found.
        if (!command) {
            return message.reply('that\'s not a valid command.');
        }

        // Gives all information about a specific command.
        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        if (command.cooldown) data.push(`**Cooldown:** ${Command.cooldown || 3} second(s).`)

        message.channel.send(data, { split: true });
    },
}