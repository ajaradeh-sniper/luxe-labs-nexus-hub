import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe, Check } from "lucide-react"

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
]

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [currentLang, setCurrentLang] = useState(i18n.language)

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode)
    setCurrentLang(langCode)
    // Update document direction for RTL languages
    document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr'
  }

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLang) || languages[0]
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 hover:bg-accent/50 transition-colors duration-200"
          aria-label={`Current language: ${getCurrentLanguage().name}. Click to change language`}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{getCurrentLanguage().flag}</span>
          <span className="hidden md:inline">{getCurrentLanguage().name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-card/95 backdrop-blur-md border border-border/50"
        role="menu"
        aria-label="Language selection menu"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`cursor-pointer flex items-center justify-between py-3 px-3 hover:bg-accent/80 transition-colors duration-200 ${
              currentLang === language.code ? 'bg-accent text-accent-foreground font-medium' : ''
            }`}
            role="menuitem"
            aria-selected={currentLang === language.code}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
            </div>
            {currentLang === language.code && (
              <Check className="h-4 w-4 text-primary" aria-hidden="true" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}