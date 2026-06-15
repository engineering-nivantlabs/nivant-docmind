import { User } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface UserAvatarProps {
  name?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function UserAvatar({ name = 'User', fallback, size = 'md' }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'h-7 w-7 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-11 w-11 text-base',
  }

  const initials = fallback || name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <Avatar className={`${sizeClasses[size]} border border-border`}>
      <AvatarFallback className="bg-[hsl(158,64%,40%)] text-white font-medium">
        {initials || <User size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />}
      </AvatarFallback>
    </Avatar>
  )
}
