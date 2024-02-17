import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTwoFactorAuthHook } from '../../hooks/use2FA'
import { toast } from 'react-toastify'

export const Disable2FAView = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [message, setMessage] = useState('')
  const [disabled, setDisabled] = useState<boolean>(false)

  const { disable2FA, isLoading } = useTwoFactorAuthHook()
  const email = searchParams.get('email')
  const code = searchParams.get('code')
  const msg = 'Your 2fa was disabled, please log-in and enable 2fa again.'

  useEffect(() => {
    const timeoutId: NodeJS.Timeout | null = null

    if (!email || !code) {
      navigate('/login')
    } else if (!disabled) {
      disable2FA({ email, code })
        .then(() => {
          toast.success(msg, { toastId: 'disable2FA-success' })
          setDisabled(true)
          setTimeout(() => navigate('/login'), 3000)
          setMessage(msg)
        })
        .catch(error => {
          console.error('Error disabling 2FA:', error)
          navigate('/login')
        })
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  return (
    <div>
      {isLoading ? <p>Disabling 2FA, please wait...</p> : <p>{message}</p>}
    </div>
  )
}
