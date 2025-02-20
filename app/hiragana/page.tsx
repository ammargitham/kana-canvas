import Image from 'next/image';
import LetterGrid from '../../components/LetterGrid';
import { letters } from '../../lib/const';
import hiraganaImage from '../../public/hiragana.jpg';

export default function HiraganaPage() {
  return (
    <div>
      <Image
        className='h-[200px] md:h-[300px] w-full object-cover'
        src={hiraganaImage}
        alt='Hiragana'
      />
      <main className='container mx-auto p-4 mt-4'>
        <h1 className="text-3xl font-bold mb-8">Hiragana</h1>
        <LetterGrid letters={letters.hiragana} type="hiragana" />
      </main>
    </div>
  )
}
