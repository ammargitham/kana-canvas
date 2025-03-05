import Link from 'next/link';
import { LazySvg } from './lazy-svg';

interface LetterGridProps {
  letters: { kana: string, pronunciation: string }[]
  type: 'hiragana' | 'katakana'
}

export default function LetterGrid({ letters, type }: LetterGridProps) {
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-4">
      {letters.map((letter, index) => {
        if (letter.kana === '') {
          return <div key={`blank-${index}`} className="bg-neutral-200/20 p-4 text-center text-2xl rounded"></div>;
        }
        return (
          <Link
            key={letter.kana}
            href={`/practice/${type}/${encodeURIComponent(letter.kana)}`}
            className="border border-neutral-200 bg-neutral-200/50 hover:bg-slate-300/50 transition-colors aspect-square text-center rounded flex flex-col items-center gap-1.5 sm:gap-2 justify-center"
          >
            <LazySvg
              className='size-6 sm:size-10 overflow-visible'
              strokeWidth={30}
              type={type}
              letter={letter.pronunciation}
            />
            <span className='text-sm font-light'>{letter.pronunciation}</span>
          </Link>
        );
      })}
    </div>
  )
}
