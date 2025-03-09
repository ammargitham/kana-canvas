import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import headerImage from '../public/top_header.jpg'

export default function Home() {
  const t = useTranslations('HomePage');

  const sections = [
    {
      title: t('hiragana'),
      description: t('hiragana-desc'),
      link: '/hiragana'
    },
    {
      title: t('katakana'),
      description: t('katakana-desc'),
      link: '/katakana'
    }
  ]

  return (
    <div>
      <Image
        className='h-[200px] md:h-[300px] w-full object-cover'
        src={headerImage}
        alt={t('kanacanvas')}
      />
      <main className='container mx-auto p-8 mt-4'>
        <h1 className="text-4xl font-normal mb-8">{t('title')}</h1>
        <p className='font-medium mb-12'>{t('description')}</p>
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
              >
                {t('learn')}
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
