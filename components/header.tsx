import MainNav from './main-nav';
import MobileNav from './mobile-nav';

export default function Header() {
  return (
    <header className='sticky top-0 z-50 w-full bg-background'>
      <MainNav />
      <MobileNav />
    </header>
  )
}