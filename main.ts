import {
  Command,
  CommandClient,
  CommandContext,
  Embed,
  EmbedPayload,
  GatewayIntents,
} from "https://deno.land/x/harmony@v2.6.0/mod.ts";

// Read .env config
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

const client = new CommandClient({
  prefix: Deno.env.get("PREFIX") || "ibot",
  intents: [
    GatewayIntents.DIRECT_MESSAGES,
    GatewayIntents.GUILDS,
    GatewayIntents.GUILD_MESSAGES,
  ],
});

client.setPresence({
  name: `${client.prefix}help`,
  type: "LISTENING",
});

client.on("ready", () => {
  console.log(`${client.user?.tag} running with prefix "${client.prefix}"`);
});

// Setup commands
const commands = Deno.readDirSync("./commands");

for (const command of commands) {
  if (!command.isFile && !command.name.endsWith(".ts")) break;

  const commandDir = `./commands/${command.name}`;
  const module = await import(commandDir);
  client.commands.add(module.default);
}

// Help command
class HelpCommand extends Command {
  name = "help";

  execute(ctx: CommandContext) {
    const file = Deno.readTextFileSync("embeds/help.json");
    const config: EmbedPayload = JSON.parse(file);

    const reply = new Embed(config).setTimestamp(Date.now());
    ctx.message.reply(reply);
  }
}

client.commands.add(HelpCommand);

client.connect();
