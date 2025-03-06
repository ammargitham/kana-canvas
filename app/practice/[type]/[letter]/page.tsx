import PracticeBottomNav from '@/components/practice-bottom-navigation'
import { letters } from '@/lib/const'
import { getNextLetter, getPrevLetter } from '@/lib/utils'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'
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

  const letterIndex = letters[type].findIndex(o => o.kana === decodeURIComponent(letter))
  const nextLetter = getNextLetter(type, letterIndex)
  const prevLetter = getPrevLetter(type, letterIndex)

  const letterObj = letters[type].find(o => o.kana === decodeURIComponent(letter));

  if (!letterObj) {
    notFound();
  }

  return (
    <Fragment>
      <hr className="bg-gray-50" />
      <main className="container mx-auto">
        <PracticePageComp letter={letter} type={type} />
        <hr className='my-4 bg-gray-50 w-full' />
        <PracticeBottomNav
          type={type}
          next={nextLetter}
          prev={prevLetter}
        />
      </main>
    </Fragment>
  )
}
