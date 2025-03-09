"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'
import { useCallback } from 'react'

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const t = useTranslations('Header');

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  return (
    <Button
      variant="ghost"
      className="h-8 w-8 px-0"
      onClick={toggleTheme}
      title={t('toggle-theme')}
    >
      <SunIcon className="hidden [html.dark_&]:block" />
      <MoonIcon className="hidden [html.light_&]:block" />
      <span className="sr-only">{t('toggle-theme')}</span>
    </Button>
  )
}
