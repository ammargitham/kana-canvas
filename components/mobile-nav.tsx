'use client';

import { cn } from '@/lib/utils';
import Logo from '@/public/logo.svg';
import { MenuIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ThemeSwitcher } from './theme-switcher';
import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './ui/drawer';


interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn("text-base", className)}
      {...props}
    >
      {children}
    </Link>
  )
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('Header');

  return (
    <div className="container px-4 h-14 flex items-center justify-between md:hidden">
      <Link
        href="/"
        className="font-bold pr-2"
        title={t('kanacanvas')}
      >
        <Logo className='h-6' />
      </Link>
      <div className='flex flex-row items-center gap-2'>
        <ThemeSwitcher />
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant='ghost'
              className='px-0 size-8'
              title={t('toggle-menu')}
            >
              <MenuIcon className='!size-6' />
              <span className="sr-only">{t('toggle-menu')}</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[60svh] p-0">
            <DrawerTitle className='sr-only'>{t('menu')}</DrawerTitle>
            <div className="overflow-auto p-6">
              <div className="flex flex-col space-y-2">
                <MobileLink
                  href="/hiragana"
                  onOpenChange={setOpen}
                >
                  {t('hiragana')}
                </MobileLink>
                <MobileLink
                  href="/katakana"
                  onOpenChange={setOpen}
                >
                  {t('katakana')}
                </MobileLink>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}
