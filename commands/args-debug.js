module.exports = {
    name: 'args-info',
    description: 'Reads arguments.',
    args: true,
    cooldown: 5,
    execute(message, args) {
        message.channel.send(`Command name: ${command}\nArguments: ${args}\nArguments length: ${args.length}`);
    },
};