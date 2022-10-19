import {
  Client,
  Embed,
  EmbedPayload,
  GatewayIntents,
  Message,
} from "https://deno.land/x/harmony@v2.6.0/mod.ts";

// Read .env config
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

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

// Setup commands
client.on("messageCreate", (msg: Message) => {
  if (msg.content.toLowerCase() == "ibot help") {
    const file = Deno.readTextFileSync("embeds/help.json");
    const config: EmbedPayload = JSON.parse(file);

    const reply = new Embed(config).setTimestamp(Date.now());
    msg.reply(reply);
  }
});

// Connect client
client.on("ready", () => console.log(`${client.user?.tag} running!!!`));
client.connect();
