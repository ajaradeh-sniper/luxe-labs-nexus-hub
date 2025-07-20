import React, { createContext, useContext, useEffect, useState } from 'react'

interface AccessibilityContextType {
  reducedMotion: boolean
  highContrast: boolean
  screenReader: boolean
  fontSize: 'small' | 'medium' | 'large'
  focusVisible: boolean
  setReducedMotion: (value: boolean) => void
  setHighContrast: (value: boolean) => void
  setFontSize: (size: 'small' | 'medium' | 'large') => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider')
  }
  return context
}

interface AccessibilityProviderProps {
  children: React.ReactNode
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [screenReader, setScreenReader] = useState(false)
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [focusVisible, setFocusVisible] = useState(false)

  useEffect(() => {
    // Detect user preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches
    
    setReducedMotion(prefersReducedMotion)
    setHighContrast(prefersHighContrast)

    // Detect screen reader usage
    const detectScreenReader = () => {
      const hasScreenReader = 
        'speechSynthesis' in window || 
        navigator.userAgent.includes('NVDA') ||
        navigator.userAgent.includes('JAWS') ||
        navigator.userAgent.includes('VoiceOver')
      setScreenReader(hasScreenReader)
    }

    detectScreenReader()

    // Keyboard navigation detection
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setFocusVisible(true)
      }
    }

    const handleMousedown = () => {
      setFocusVisible(false)
    }

    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('mousedown', handleMousedown)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('mousedown', handleMousedown)
    }
  }, [])

  useEffect(() => {
    // Apply accessibility preferences to document
    document.documentElement.classList.toggle('reduce-motion', reducedMotion)
    document.documentElement.classList.toggle('high-contrast', highContrast)
    document.documentElement.classList.toggle('focus-visible', focusVisible)
    document.documentElement.setAttribute('data-font-size', fontSize)
  }, [reducedMotion, highContrast, focusVisible, fontSize])

  const value = {
    reducedMotion,
    highContrast,
    screenReader,
    fontSize,
    focusVisible,
    setReducedMotion,
    setHighContrast,
    setFontSize
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}

// Skip link component for keyboard navigation
export function SkipLink({ href = "#main-content", children = "Skip to main content" }) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
    >
      {children}
    </a>
  )
}

// Focus trap component
export function FocusTrap({ children, active = true }: { children: React.ReactNode; active?: boolean }) {
  const trapRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active || !trapRef.current) return

    const trap = trapRef.current
    const focusableElements = trap.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }
      
      if (e.key === 'Escape') {
        firstElement?.focus()
      }
    }

    trap.addEventListener('keydown', handleKeyDown)
    firstElement?.focus()

    return () => {
      trap.removeEventListener('keydown', handleKeyDown)
    }
  }, [active])

  return (
    <div ref={trapRef} className="contents">
      {children}
    </div>
  )
}

// Screen reader announcements
export function Announcer({ message, priority = 'polite' }: { 
  message: string; 
  priority?: 'polite' | 'assertive' 
}) {
  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  )
}