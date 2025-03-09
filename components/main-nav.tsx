'use client';

import { cn } from '@/lib/utils';
import Logo from '@/public/logo.svg';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LocaleSwitcher } from './locale-switcher';
import { ThemeSwitcher } from './theme-switcher';

interface StyledLinkProps {
  active?: boolean;
  children: React.ReactNode;
  href: string;
}

function StyledLink({ active, children, href }: StyledLinkProps) {
  return (
    <Link
      className={cn(
        'text-sm font-medium transition-colors',
        active && 'text-blue-500 font-medium [text-shadow:_0_0_0.5px_theme(colors.blue.500)]',
        !active && 'text-foreground/75 hover:text-foreground focus:text-foreground',
      )}
      href={href}
    >
      {children}
    </Link>
  );
}

export default function MainNav() {
  const path = usePathname();
  const t = useTranslations('Header');

  return (
    <div className="px-4 py-2 hidden md:flex items-center">
      <Link
        href="/"
        title={t('kanacanvas')}
      >
        <Logo className='h-6' />
      </Link>
      <div className='flex-1 flex justify-end gap-6 items-center'>
        <StyledLink
          href="/hiragana"
          active={path === '/hiragana' || path.startsWith('/practice/hiragana/')}
        >
          {t('hiragana')}
        </StyledLink>
        <StyledLink
          href="/katakana"
          active={path === '/katakana' || path.startsWith('/practice/katakana/')}
        >
          {t('katakana')}
        </StyledLink>
        <div className='flex gap-1'>
          <ThemeSwitcher />
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  )
}
