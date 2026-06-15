import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 18, text: 'text-lg' },
    md: { icon: 22, text: 'text-xl' },
    lg: { icon: 28, text: 'text-2xl' },
  }

  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(158,64%,40%)] text-white shadow-sm">
        <FileText size={sizes[size].icon} strokeWidth={2} />
      </div>
      <span className={`font-bold ${sizes[size].text} text-foreground tracking-tight`}>
        Docu<span className="text-[hsl(158,64%,40%)]">Chat</span>
      </span>
    </Link>
  )
}
