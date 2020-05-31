const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

// Syncs the command folder, filters to only .js files.
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Reads the commands folder!
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Lets us know the bot is ready for action.
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    // Makes the bot not listen to other bots.
    if (message.author.bot) return;
    // if (!message.content.startsWith(prefix) || message.author.bot) return;
    // Uncomment to disable easter eggs, this makes the bot not listen to any comments without the prefix on it.
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // If there is no command of the name found in 'commands', it stops listening. Also checks for aliases.
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    // Provides a server check.
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('This is a server command. It cannot be executed in DMs.');
    }

    // Provides argument checks, provides proper usage of command.
    if (command.args && !args.length) {
        let reply = `There weren't any arguments in your message, ${message.author}.`
    
        if (command.usage) {
            reply += `\nIt should look more like this: \`${command.name} ${command.usage}\``
        }
        return message.channel.send(reply);
    }

    // Checks for cooldown on commands
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    // Sets up cooldown times for when commands are triggered.
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    // Checks timestampped cooldown for users.
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

       // Checks if the user can use the command. Anti-spam, basically.
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before attempting to use \`${command.name}\` again.`);
        }
    }

    // Removes cooldowns.
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Executes commands.
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command. Does it exist?');
    }
});

client.login(token)