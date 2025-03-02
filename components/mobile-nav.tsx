'use client';

import { cn } from '@/lib/utils';
import logo from '@/public/logo.svg';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
  const [open, setOpen] = useState(false)

  return (
    <div className="container px-4 h-14 flex items-center justify-between md:hidden">
      <Link href="/" className="font-bold pr-2">
        <Image src={logo} alt="KanaCanvas" height={24} />
      </Link>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant='ghost' className='p-2 size-9 [&_svg]:size-7'>
            <Menu />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[60svh] p-0">
          <DrawerTitle className='sr-only'>Menu</DrawerTitle>
          <div className="overflow-auto p-6">
            <div className="flex flex-col space-y-2">
              <MobileLink
                href="/hiragana"
                onOpenChange={setOpen}
              >
                Hiragana
              </MobileLink>
              <MobileLink
                href="/katakana"
                onOpenChange={setOpen}
              >
                Katakana
              </MobileLink>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
