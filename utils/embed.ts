import { Embed } from "https://deno.land/x/harmony@v2.6.0/mod.ts";

/**
 * Reads a json file from embeds dir and return an Embed with
 * the currect timestamp
 */
export function getEmbed(embedName: string): Embed {
  // read file contents
  const embedPath = getEmbedPath(embedName);
  const embedText = Deno.readTextFileSync(embedPath);

  // create an embed
  const date = Date.now();
  return new Embed(JSON.parse(embedText)).setTimestamp(date);
}

function getEmbedPath(embedName: string) {
  const cwd = Deno.cwd();
  return `${cwd}/embeds/${embedName}.json`;
}
