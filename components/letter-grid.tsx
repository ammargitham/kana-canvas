import Link from 'next/link';

interface LetterGridProps {
  letters: { kana: string, pronunciation: string }[]
  type: 'hiragana' | 'katakana'
}

export default function LetterGrid({ letters, type }: LetterGridProps) {
  return (
    <div className='flex content-center'>
      <div className="grid grid-cols-5 gap-4 w-full">
        {letters.map((letter, index) => {
          if (letter.kana === '') {
            return <div key={`blank-${index}`} className="bg-gray-200 p-4 text-center text-2xl rounded"></div>;
          }
          return (
            <Link
              key={letter.kana}
              href={`/practice/${type}/${encodeURIComponent(letter.kana)}`}
              className="border bg-slate-200 p-4 text-center rounded hover:bg-slate-300 transition-colors flex flex-col items-center gap-2"
            >
              <span className='text-4xl font-bold'>{letter.kana}</span>
              <span className='text-sm font-light'>{letter.pronunciation}</span>
            </Link>
          );
        })}
      </div>
    </div>
  )
}
