const { Client, WebhookClient, MessageEmbed } = require("discord.js-selfbot-v13");
const client = new Client({checkUpdate: false});
const config = require("./config.json");
const webhookClient = new WebhookClient({ url: config.webhookURL });


client.on("ready", async () => {
  console.log(`${client.user.username} is ready!`);
})

client.on("messageCreate", async (message) => {
    if (message.author.id == client.user.id) return;
    if (message.content.startsWith("discord.gift/") || message.content.startsWith("https://discord.gift/")) {
        onNitroFound(message.content, message.author.id, message.author.tag)
    }
})

async function onNitroFound(nitroCode, id, name) {
    const embed = new MessageEmbed()
	.setColor(0x0099FF)
	.setTitle("NITRO GRABBED")
	.setURL("https://github.com/Freht1337/nitro-sniper/")
        .setDescription("**Nitro Code:** ||" + nitroCode + "||\n**Grabbed by *" + id + " (" + name + ")***")
        .setTimestamp()
        .setFooter({ text: "by Freht1337"});

    await webhookClient.send({
        embeds: [embed],
    });
}

client.login(config.token);
