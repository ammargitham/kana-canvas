import Image from 'next/image'
import LetterGrid from '../../components/LetterGrid'
import { letters } from '../../lib/const'
import katakanaImage from '../../public/katakana.jpg'

export default function KatakanaPage() {
  return (
    <div>
      <Image
        className='h-[200px] md:h-[300px] w-full object-cover'
        src={katakanaImage}
        alt='Katakana'
      />
      <main className='container mx-auto p-4 mt-4'>
        <h1 className="text-3xl font-bold mb-4">Katakana Practice</h1>
        <LetterGrid letters={letters.katakana} type="katakana" />
      </main>
    </div>
  )
}
