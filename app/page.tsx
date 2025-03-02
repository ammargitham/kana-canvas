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
      <main className='container mx-auto p-8 mt-4'>
        <h1 className="text-4xl font-normal mb-8">Beautiful handwriting in Japanese</h1>
        <p className='font-medium mb-12'>Improve your Japanese handwriting with easy-to-follow stroke orders and real examples of proper handwriting. Practice in our interactive space to build confidence in your writing skills.</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-28'>
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
              >Learn</Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
