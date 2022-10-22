import { Embed, EmbedPayload } from "https://deno.land/x/harmony@v2.6.0/mod.ts";

/**
 * Reads a json file from embeds dir and return an Embed with
 * the currect timestamp
 */
export function readEmbedFile(filename: string): Embed {
  // read file contents
  const fileDir = Deno.cwd() + "/embeds/" + filename + ".json";
  const fileContent = Deno.readTextFileSync(fileDir);

  // create an embed
  const payload: EmbedPayload = JSON.parse(fileContent);
  return new Embed(payload).setTimestamp(Date.now());
}
