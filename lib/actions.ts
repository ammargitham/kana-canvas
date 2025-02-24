'use server';

export async function getGaId() {
  return process.env.GOOGLE_TAG_ID;
}
