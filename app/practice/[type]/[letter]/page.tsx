import { letters } from '@/lib/const'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PracticePage as PracticePageComp } from './_components/practice-page'

type PageProps = {
  params: Promise<{ type: string, letter: string }>
}

export async function generateMetadata(
  {
    params,
  }: PageProps
): Promise<Metadata> {
  const { type, letter } = await params;
  return {
    title: `Practice ${decodeURIComponent(letter)} | ${type}`,
  }
}

export async function generateStaticParams() {
  return Object
    .entries(letters)
    .flatMap(([type, typeLetters]) => typeLetters.map((letter) => ({
      type,
      letter: encodeURIComponent(letter.kana),
    })))
    .filter((param) => !!param.letter);
}

export default async function PracticePage({ params }: PageProps) {
  const { type, letter } = await params;

  if (!['hiragana', 'katakana'].includes(type)) {
    notFound();
  }

  const letterObj = letters[type].find(o => o.kana === decodeURIComponent(letter));

  if (!letterObj) {
    notFound();
  }

  return (
    <PracticePageComp letter={letter} type={type} />
  )
}
