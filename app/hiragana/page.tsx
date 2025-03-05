import LetterGrid from '@/components/letter-grid';
import { letters } from '@/lib/const';
import hiraganaImage from '@/public/hiragana.jpg';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Hiragana',
}

export default function HiraganaPage() {
  return (
    <div>
      <Image
        className='h-[200px] md:h-[300px] w-full object-cover'
        src={hiraganaImage}
        alt='Hiragana'
      />
      <main className='container mx-auto p-4 mt-4'>
        <div className='mx-auto w-full sm:w-[600px]'>
          <h1 className="text-3xl font-bold mb-8">Hiragana</h1>
          <LetterGrid letters={letters.hiragana} type="hiragana" />
        </div>
      </main>
    </div>
  )
}
