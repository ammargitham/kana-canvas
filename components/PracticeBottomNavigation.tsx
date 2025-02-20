import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface PracticeBottomNavParams {
  type: string;
  next: string;
  prev: string;
}

const PracticeBottomNav: React.FC<PracticeBottomNavParams> = (
  {
    type,
    next,
    prev,
  }
) => {
  return (
    <div className="container flex justify-between p-4">
      {prev ? (
        <Link
          className={`flex items-center ${!prev ? 'pointer-events-none opacity-50' : ''}`}
          href={prev ? `/practice/${type}/${encodeURIComponent(prev)}` : '#'}
        >
          <ArrowLeft />
          <div
            className="border bg-slate-200 hover:bg-slate-300 p-4 text-center text-2xl font-bold rounded ml-2"
          >
            {prev}
          </div>
        </Link>
      ) : <div></div>}
      {next ? (
        <Link
          className={`flex items-center ${!next ? 'pointer-events-none opacity-50' : ''}`}
          href={next ? `/practice/${type}/${encodeURIComponent(next)}` : '#'}
        >
          <div
            className="border bg-slate-200 hover:bg-slate-300 p-4 text-center text-2xl font-bold rounded mr-2"
          >
            {next}
          </div>
          <ArrowRight />
        </Link>
      ) : <div></div>}
    </div>
  );
};

export default PracticeBottomNav;
