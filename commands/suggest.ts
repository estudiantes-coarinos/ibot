import {
  Command,
  CommandContext,
} from "https://deno.land/x/harmony@v2.6.0/mod.ts";

export default class extends Command {
  name = "suggest";

  execute(ctx: CommandContext) {
    const suggestion = ctx.message.content.trim().slice(12);

    if (suggestion) {
      reportSuggestion(ctx, suggestion);
      ctx.message.reply("Suggestion submited");
    } else {
      ctx.message.reply("Empty suggestion :(");
    }
  }
}

async function reportSuggestion(ctx: CommandContext, suggestion: string) {
  const DEVELOPER_ID = Deno.env.get("DEVELOPER_ID") || undefined;

  if (DEVELOPER_ID) {
    const developer = await ctx.client.users.fetch(DEVELOPER_ID);
    const report = formatSuggestion(ctx, suggestion);
    developer.send(report);
  } else {
    ctx.message.reply("There's not a developer for this bot instance");
  }
}

function formatSuggestion(ctx: CommandContext, suggestion: string): string {
  return `**New suggestion from <@${ctx.message.author.id}>:** ${suggestion}`;
}
