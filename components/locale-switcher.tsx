import { GlobeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Locale, localeLabels, locales } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';
import { useLocale, useTranslations } from 'next-intl';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations('Header');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 px-2"
          title={t('change-language')}
        >
          <GlobeIcon />
          <span className='font-light'>{locale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(value) => {
            setUserLocale(value as Locale);
          }}
        >
          {locales.map((l, i) => {
            return (
              <DropdownMenuRadioItem
                key={l}
                value={l}
              >
                {localeLabels[i]}
              </DropdownMenuRadioItem>
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
