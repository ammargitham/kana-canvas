import LetterGrid from '@/components/letter-grid'
import { letters } from '@/lib/const'
import katakanaImage from '@/public/katakana.jpg'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Katakana',
}

export default function KatakanaPage() {
  return (
    <div>
      <Image
        className='h-[200px] md:h-[300px] w-full object-cover'
        src={katakanaImage}
        alt='Katakana'
      />
      <main className='container mx-auto p-4 mt-4'>
        <h1 className="text-3xl font-bold mb-8">Katakana</h1>
        <LetterGrid letters={letters.katakana} type="katakana" />
      </main>
    </div>
  )
}
