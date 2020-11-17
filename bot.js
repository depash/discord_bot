const discord = require('discord.js');
const { prefix, token } = require('./config.json');
const fs = require('fs');
const leuge_data = require('./scraper/lol_scraper.js');
const bot = new discord.Client();
const request = require('request');
const cherrio = require('cheerio');


bot.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));




for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

    bot.on('message', message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === "rank") {
            const temp_lolname = message.content.split(' ');
            lolname = temp_lolname[1];
            request('https://www.leagueofgraphs.com/summoner/na/' + lolname, (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    var $ = cherrio.load(html);
                    var rank = $("[class='leagueTier']").text();
                    message.channel.send(lolname + `'s rank is\n ` + rank);

                }
            });
        }
    });


    bot.login(token);