import { Letter } from '@/lib/const';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { LazySvg } from './lazy-svg';

interface LetterBoxProps {
  className: string;
  type: string;
  letter: Letter;
}

function LetterBox(
  {
    className,
    type,
    letter,
  }: LetterBoxProps
) {
  return (
    <div
      className={cn(
        "border border-neutral-200 bg-neutral-200/50 hover:bg-slate-300/50 transition-colors size-16 text-2xl font-bold rounded flex flex-col gap-1.5 items-center justify-center",
        className,
      )}
    >
      <LazySvg
        className='size-6 overflow-visible'
        strokeWidth={30}
        type={type}
        letter={letter.pronunciation}
      />
      <span className='text-sm font-light'>{letter.pronunciation}</span>
    </div>
  );
}

interface PracticeBottomNavParams {
  type: string;
  next: Letter;
  prev: Letter;
}

export default function PracticeBottomNav(
  {
    type,
    next,
    prev,
  }: PracticeBottomNavParams
) {
  return (
    <div className="container flex justify-between p-4">
      {prev.kana ? (
        <Link
          className={`flex items-center ${!prev.kana ? 'pointer-events-none opacity-50' : ''}`}
          href={prev.kana ? `/practice/${type}/${encodeURIComponent(prev.kana)}` : '#'}
        >
          <ArrowLeft />
          <LetterBox
            className='ml-2'
            type={type}
            letter={prev} />
        </Link>
      ) : <div></div>}
      {next.kana ? (
        <Link
          className={`flex items-center ${!next.kana ? 'pointer-events-none opacity-50' : ''}`}
          href={next.kana ? `/practice/${type}/${encodeURIComponent(next.kana)}` : '#'}
        >
          <LetterBox
            className='mr-2'
            type={type}
            letter={next} />
          <ArrowRight />
        </Link>
      ) : <div></div>}
    </div>
  );
}

