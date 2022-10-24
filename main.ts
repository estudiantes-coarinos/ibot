import {
  command,
  CommandClient,
  CommandContext,
  event,
  GatewayIntents,
} from "https://deno.land/x/harmony@v2.6.0/mod.ts";

import { readEmbedFile } from "./utils/embed.ts";

// Read .env config
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

class Bot extends CommandClient {
  constructor() {
    super({
      intents: [
        GatewayIntents.DIRECT_MESSAGES,
        GatewayIntents.GUILDS,
        GatewayIntents.GUILD_MESSAGES,
      ],

      prefix: Deno.env.get("PREFIX") || "@",
    });
  }

  @event()
  ready() {
    console.log(`${this.user?.tag} running`);

    this.setPresence({
      name: this.prefix + "help",
      type: "LISTENING",
    });
  }

  @command({ aliases: "help" })
  Help(ctx: CommandContext) {
    ctx.message.reply(readEmbedFile("help"));
  }
}

// Setup commands
const bot = new Bot();
const commandFiles = Deno.readDirSync("./commands");

for (const commandFile of commandFiles) {
  const commandPath = `./commands/${commandFile.name}`;
  const module = await import(commandPath);
  bot.commands.add(module.default);
}

bot.connect();
