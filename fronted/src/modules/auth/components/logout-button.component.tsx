'use client'

import { LogOutIcon } from 'lucide-react'
import { useAuth } from '../hooks/use-auth'

export function LogoutButton () {
  const { logout } = useAuth()

  return (
    <div className='flex items-center gap-3 cursor-pointer' onClick={() => {
      void logout()
    }}>
      <LogOutIcon className="w-5 h-5" />
      <span>Cerrar Sesión</span>
    </div>
  )
}
