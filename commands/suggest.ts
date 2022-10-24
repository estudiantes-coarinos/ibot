import {
    Command,
    CommandContext,
    Message,
} from "https://deno.land/x/harmony@v2.6.0/mod.ts";

/**
 * Report a suggestion to the given developer in the
 * DEVELOPER_ID environment variable.
 */
export default class extends Command {
    name = "suggest";

    execute(ctx: CommandContext) {
        const DEVELOPER_ID = Deno.env.get("DEVELOPER_ID");

        if (DEVELOPER_ID) {
            ctx.client.users.fetch(DEVELOPER_ID).then((developer) => {
                const suggestion = getSuggestion(ctx.message);
                developer.send(suggestion);
            });
        }
    }
}

function getSuggestion(message: Message) {
    const author = `<@${message.author.id}>`;
    const suggestion = message.content.trim().slice(12);

    return `New suggestion from ${author}: ${suggestion}`;
}
