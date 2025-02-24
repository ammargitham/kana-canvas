'use server';

import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getGaId() {
  const { env } = await getCloudflareContext({ async: true});
  const gaId = (env as Env).GOOGLE_TAG_ID;
  return gaId;
}
