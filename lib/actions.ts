'use server';


export async function getGaId() {
  // const { env } = await getCloudflareContext({ async: true});
  // const gaId = (env as Env).GOOGLE_TAG_ID;
  const gaId = process.env.GOOGLE_TAG_ID;
  return gaId;
}
