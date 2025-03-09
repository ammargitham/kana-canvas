import LetterGrid from '@/components/letter-grid'
import { letters } from '@/lib/const'
import katakanaImage from '@/public/katakana.jpg'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Katakana' });
  return {
    title: t('title'),
  }
}

export default function KatakanaPage() {
  const t = useTranslations('Katakana');

  return (
    <div>
      <Image
        className='h-[200px] md:h-[300px] w-full object-cover'
        src={katakanaImage}
        alt={t('title')}
      />
      <main className='container mx-auto p-4 mt-4'>
        <div className='mx-auto w-full sm:w-[600px]'>
          <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
          <LetterGrid letters={letters.katakana} type="katakana" />
        </div>
      </main>
    </div>
  )
}
