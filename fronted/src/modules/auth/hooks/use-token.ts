import { useEffect } from 'react'
import { deleteSessionAction, getSessionAction } from '../server/actions'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/modules/common/hooks/use-redux'
import { setNotificationState } from '@/modules/common/reducers/notification-reducer'
import { logoutReducer, setExpirationReducer } from '../reducers'

export function useToken () {
  const { expiration } = useAppSelector(s => s.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (expiration && expiration > 0) {
      const timeTrigger = sessionExpiresIn({ exp: expiration })

      const timer = setTimeout(async () => {
        await deleteSessionAction()
        dispatch(setNotificationState({ message: 'Sesion cerrada por inactividad' }))
        dispatch(logoutReducer())
        router.push('/')
      }, (timeTrigger) * 1000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [expiration])

  useEffect(() => {
    const getToken = async () => {
      const session = await getSessionAction()
      if (session) {
        dispatch(setExpirationReducer(session.expiration))
      }
    }
    void getToken()
  }, [])
}

function sessionExpiresIn ({ exp }: { exp: number }) {
  const now = new Date().getTime()
  const dateExp = new Date(exp).getTime()
  return Math.floor((dateExp - now) / 1000)
}
