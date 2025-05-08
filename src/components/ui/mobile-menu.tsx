import { useState, useEffect, memo } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { NAV_LINKS } from '@/consts'
import { Menu } from 'lucide-react'

// Using memo to prevent unnecessary re-renders
const MobileMenu = memo(() => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleViewTransitionStart = () => {
      setIsOpen(false)
    }

    // Close menu on page navigation
    document.addEventListener('astro:before-swap', handleViewTransitionStart)

    // Also close menu when user scrolls (improves mobile UX)
    const handleScroll = () => {
      if (isOpen) setIsOpen(false)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('astro:before-swap', handleViewTransitionStart)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isOpen])

  // Memoized click handler to prevent recreating on each render
  const handleButtonClick = () => {
    setIsOpen((val) => !val)
  }

  // Optimized menu item rendering
  const menuItems = NAV_LINKS.map((item) => (
    <DropdownMenuItem key={item.href} asChild>
      <a
        href={item.href}
        className="w-full text-lg font-medium capitalize"
        onClick={() => setIsOpen(false)}
      >
        {item.label}
      </a>
    </DropdownMenuItem>
  ))

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        asChild
        onClick={handleButtonClick}
      >
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          title="Menú"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background">
        {menuItems}
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

// Add display name for better debugging
MobileMenu.displayName = 'MobileMenu'

// Explicitly use client directive when importing this component
export default MobileMenu
