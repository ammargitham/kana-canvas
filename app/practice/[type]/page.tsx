import { letters } from '@/lib/const';
import { notFound, redirect } from 'next/navigation';

export default async function PracticeTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  if (!['hiragana', 'katakana'].includes(type)) {
    notFound();
  }
  redirect(`/practice/${type}/${encodeURIComponent(letters[type][0].kana)}`)
}