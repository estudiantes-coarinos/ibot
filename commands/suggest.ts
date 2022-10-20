import {
  Command,
  CommandContext,
} from "https://deno.land/x/harmony@v2.6.0/mod.ts";

/**
 * Report a suggestion to the given developer in the
 * DEVELOPER_ID environment variable.
 */
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

/**
 * Send the given suggestion to the developer defined in the DEVELOPER_ID
 * environment variable
 */
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

/**
 * Formats a given suggestion with a template message 
 * @returns string
 */
function formatSuggestion(ctx: CommandContext, suggestion: string) {
  return `**New suggestion from <@${ctx.message.author.id}>:** ${suggestion}`;
}
