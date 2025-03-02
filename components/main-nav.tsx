'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '../public/logo.svg';

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

  return (
    <div className="p-4 hidden md:flex items-center">
      <Link href="/">
        <Image src={logo} alt="KanaCanvas" height={24} />
      </Link>
      <div className='flex-1 flex justify-end gap-6'>
        <StyledLink
          href="/hiragana"
          active={path === '/hiragana' || path.startsWith('/practice/hiragana')}
        >
          Hiragana
        </StyledLink>
        <StyledLink
          href="/katakana"
          active={path === '/katakana' || path.startsWith('/practice/katakana')}
        >
          Katakana
        </StyledLink>
      </div>
    </div>
  )
}
