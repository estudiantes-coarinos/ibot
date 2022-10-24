import { Embed, EmbedPayload } from "https://deno.land/x/harmony@v2.6.0/mod.ts";

/**
 * Reads a json file from embeds dir and return an Embed with
 * the currect timestamp
 */
export function getEmbed(embedName: string): Embed {
  const payload = parseEmbed(embedName);
  return new Embed(payload).setTimestamp(Date.now());
}

function parseEmbed(embedName: string): EmbedPayload {
  const embedPath = getEmbedPath(embedName);
  const embedText = Deno.readTextFileSync(embedPath);
  return JSON.parse(embedText);
}

function getEmbedPath(embedName: string) {
  const cwd = Deno.cwd();
  return `${cwd}/embeds/${embedName}.json`;
}
