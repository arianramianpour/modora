const { MessageEmbed } = require('discord.js')
const db = require('quick.db');
module.exports = {
  config: {
    name: "report",
    description: "report members",
    usage: "m/report <mention member/member id> [reason]",
    aliases: []
  },
  run: async (bot, message, args) => {
    let reportPermErr = new MessageEmbed()
      .setTitle("**User Permission Error!**")
      .setDescription("**Sorry, you don't have permissions to use this! ❌**")

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.reply("Please mention a valid member of this server");

    let reason = args.slice(1).join(' ');
    if (!reason) return message.reply("Please give a reason");

    member.send(`You have been reported by <${message.author.username}> for this reason: ${reason}`)
      .catch(error => message.channel.send(`Sorry <${message.author}> I couldn't n't report because of : ${error}`));
    let reportEmbed = new MessageEmbed()
    .setColor("#E67E22")
      .setTitle("**__report Report__**")
      .setDescription(`**<@${member.user.id}> has been reported by <@${message.author.id}>**`)
      .addField(`**Reason:**`, `\`${reason}\``)
      .addField(`**Action:**`, `\`report\``)
      .addField(`**Moderator:**`, `${message.author}`);

    message.channel.send(reportEmbed)


    let channel = db.fetch(`modlog_${message.guild.id}`)
    if (channel == null) return;

    if (!channel) return;


    var sChannel = message.guild.channels.cache.get(channel)
    if (!sChannel) return;
    sChannel.send(reportEmbed)



  }

}