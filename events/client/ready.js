const { PREFIX, LAVA_HOST, LAVA_PASSWORD, LAVA_PORT  } = require('../../config');
const { MessageEmbed } = require("discord.js")

module.exports = async bot => {
    console.log(`${bot.user.username} is available now!`)
    var activities = [ `${PREFIX}help |${bot.guilds.cache.size} servers`, `hightechrobo.com` ], i = 0;
    setInterval(() => bot.user.setActivity(` ${activities[i++ % activities.length]}`, { type: "WATCHING" }),5000)
    
};
