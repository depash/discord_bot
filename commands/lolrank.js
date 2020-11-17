module.exports = {
    name: 'rank',
    description: 'Display users rank in lol.',
    execute(message) {
        message.channel.send(`your rank is`);
    },
};