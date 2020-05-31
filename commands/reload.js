module.exports = {
    name: 'reload',
    description: 'Reloads a command if updated.',
    args: true,
    execute(message, args) {
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
	        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            return message.channel.send(`The command \`${commandName}\` does not exist, ${message.author}.`); 
        }

        // Deletes the cached command to replace with the updated one.
        delete require.cache[require.resolve(`./${command.name}.js`)];

        // Reloads the command and catches errors.
        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Command \`${command.name}\` was reloaded.`);
        } catch (error) {
            console.log(error);
            message.channel.send(`There was an error while reloading the command \`${command.name}\`.`);
        }
    },
}