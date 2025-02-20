import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import headerImage from '../public/top_header.jpg'

const sections = [
  {
    title: 'Hiragana',
    description: 'Hiragana is one of the basic Japanese writing systems, consisting of 46 characters. It is used for native Japanese words, grammatical functions, and often paired with Katakana and Kanji. Learning Hiragana is the first step in writing Japanese.',
    link: '/hiragana'
  },
  {
    title: 'Katakana',
    description: 'Katakana is a Japanese writing system used for foreign words, names, and certain scientific terms. It is typically used alongside Hiragana and Kanji. Learning Katakana is key to understanding and reading loanwords in Japanese.',
    link: '/katakana'
  }
]

export default function Home() {
  return (
    <div>
      <Image
        className='h-[200px] md:h-[300px] w-full object-cover'
        src={headerImage}
        alt='KanaCanvas'
      />
      <main className='container mx-auto p-4 mt-4'>
        <h1 className="text-4xl font-semibold mb-12">Tips for beautiful Japanese handwriting</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold mb-2">{section.title}</h2>
              <p className="text-sm mb-3">{section.description}</p>
              <Link
                href={section.link}
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'border-blue-400 text-blue-500 hover:text-blue-600',
                )}
              >Learn More</Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
