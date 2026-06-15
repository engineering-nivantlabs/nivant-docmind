import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LayoutDashboard, FileUp, FolderOpen, Settings } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import ThemeToggle from '@/components/shared/ThemeToggle'
import UserAvatar from '@/components/shared/UserAvatar'
import { Button } from '@/components/ui/button'

const landingLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
]

const appLinks = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Upload', href: '/upload', icon: FileUp },
  { label: 'Documents', href: '/documents', icon: FolderOpen },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const isLanding = location.pathname === '/'
  const isApp = !isLanding

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isLanding
            ? scrolled
              ? 'bg-white/80 dark:bg-background/80 backdrop-blur-md shadow-sm border-b border-border'
              : 'bg-transparent'
            : 'bg-white/80 dark:bg-background/80 backdrop-blur-md shadow-sm border-b border-border'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo size="md" />

            {isLanding && (
              <div className="hidden md:flex items-center gap-8">
                {landingLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {isApp && (
              <div className="hidden md:flex items-center gap-1">
                {appLinks.map(link => {
                  const Icon = link.icon
                  const isActive = location.pathname === link.href
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[hsl(158,64%,95%)] text-[hsl(158,64%,35%)]'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon size={16} />
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            )}

            <div className="flex items-center gap-2">
              <ThemeToggle />
              {isLanding ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/dashboard">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button size="sm" className="bg-[hsl(158,64%,40%)] hover:bg-[hsl(158,64%,35%)] text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="hidden sm:block">
                  <UserAvatar name="Demo User" fallback="DU" size="sm" />
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white dark:bg-background border-b border-border shadow-lg md:hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {isLanding ? (
                landingLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))
              ) : (
                appLinks.map(link => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      <Icon size={18} />
                      {link.label}
                    </Link>
                  )
                })
              )}
              {isLanding && (
                <div className="pt-2 border-t border-border">
                  <Link to="/dashboard" className="block w-full">
                    <Button className="w-full bg-[hsl(158,64%,40%)] hover:bg-[hsl(158,64%,35%)] text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
