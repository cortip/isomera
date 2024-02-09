import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTwoFactorAuthHook } from '../../hooks/use2FA'
import { toast } from 'react-toastify'

export const Disable2FAView = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [message, setMessage] = useState('')

  const { disable2FA, isLoading } = useTwoFactorAuthHook()

  useEffect(() => {
    const email = searchParams.get('email')
    const code = searchParams.get('code')

    if (!email || !code) {
      navigate('/login')
    } else {
      disable2FA({ email, code })
        .then(() => {
          const msg =
            'Your 2fa was disabled, please log-in and enable 2fa again.'
          toast.success(msg)
          setMessage(msg)
          setTimeout(() => navigate('/login'), 3000)
        })
        .catch((error: any) => {
          console.error('Error disabling 2FA:', error)
          navigate('/login')
        })
    }
  }, [disable2FA, navigate, searchParams])

  return (
    <div>
      {isLoading ? <p>{message}</p> : <p>Disabling 2FA, please wait...</p>}
    </div>
  )
}
