'use server';

export async function getGaId() {
  return process.env.GOOGLE_TAG_ID;
}

export async function getAdSenseId() {
  return process.env.GOOGLE_ADSENSE;
}
