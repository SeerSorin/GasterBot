module.exports = {
    name: 'eastereggs',
    description: 'Easter eggs.',
    // find a way to get this work
    execute(message) {
        message.channel.send(`It\'s rude to talk about someone who\'s listening.`)
    },
}