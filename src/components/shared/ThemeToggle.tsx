import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { Button } from '@/components/ui/button'

export default function ThemeToggle() {
  const { toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-lg"
      aria-label="Toggle theme"
    >
      <Sun
        size={18}
        className="absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        size={18}
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </Button>
  )
}
