'use client'

import { useEffect } from 'react'
import { useAuth } from '../hooks/use-auth'
import { type User } from '../types'
import { useToken } from '../hooks/use-token'

export function UserLayer ({ user }: { user: User }) {
  const { setUser } = useAuth()
  useToken()
  useEffect(() => {
    setUser({ user })
  }, [])
  return null
}
