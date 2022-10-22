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

class Client extends CommandClient {
  constructor() {
    super({
      prefix: Deno.env.get("PREFIX") || "ibot ",
      intents: [
        GatewayIntents.DIRECT_MESSAGES,
        GatewayIntents.GUILDS,
        GatewayIntents.GUILD_MESSAGES,
      ],
    });
  }

  @event()
  ready() {
    console.log(`Logged in as ${this.user?.tag}!`);

    this.setPresence({
      name: `${this.prefix}help`,
      type: "LISTENING",
    });
  }

  @command({ aliases: "help" })
  Help(ctx: CommandContext) {
    ctx.message.reply(readEmbedFile("help"));
  }
}

// Setup commands
const client = new Client();
const commands = Deno.readDirSync("./commands");

for (const command of commands) {
  if (command.isFile && command.name.endsWith(".ts")) {
    // import all commands
    const commandDir = `./commands/${command.name}`;
    client.commands.add(await import(commandDir));
  }
}

client.connect();
