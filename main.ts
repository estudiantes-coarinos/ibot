import {
  Client,
  Embed,
  EmbedPayload,
  GatewayIntents,
  Message,
  User,
} from "https://deno.land/x/harmony@v2.6.0/mod.ts";

// Read .env config
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

const DEVELOPER_ID = Deno.env.get("DEVELOPER_ID") || undefined;
const INTENTS = [
  GatewayIntents.DIRECT_MESSAGES,
  GatewayIntents.GUILDS,
  GatewayIntents.GUILD_MESSAGES,
];

const client = new Client({
  intents: INTENTS,
});

client.setPresence({
  name: "ibot help",
  type: "LISTENING",
});

// Help command
client.on("messageCreate", (msg: Message) => {
  if (msg.content.toLowerCase() !== "ibot help") return;

  const file = Deno.readTextFileSync("embeds/help.json");
  const config: EmbedPayload = JSON.parse(file);

  const reply = new Embed(config).setTimestamp(Date.now());
  msg.reply(reply);
});

// Suggest command
client.on("messageCreate", (msg: Message) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith("ibot suggest")) return;

  if (DEVELOPER_ID === undefined) {
    msg.reply("There's not a developer for this bot instance");
    return;
  }

  // Report suggestion to the developer
  client.users.fetch(DEVELOPER_ID).then((developer: User) => {
    developer.send(
      `**New suggestion from <@${msg.author.id}>:** ${msg.content.slice(12)}`,
    );
  });

  msg.reply("Suggestion submited");
});

// Connect client
client.on("ready", () => console.log(`${client.user?.tag} running!!!`));
client.connect();
