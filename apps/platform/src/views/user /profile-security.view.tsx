import React, { useEffect, useState } from 'react'
import useSession from '../../hooks/useSession'
import { useTwoFactorAuthHook } from '../../hooks/use2FA'

export const UserSecurityView: React.FC = () => {
  const { generate2FA, verify2FA, isLoading } = useTwoFactorAuthHook()
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  )
  const {
    user,
    recoveryCodes,
    updateRecoveryCodes,
    recoveryViewed,
    updateRecoveryViewed
  } = useSession()

  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false)

  useEffect(() => {
    let hideTimer: NodeJS.Timeout | null = null
    if (recoveryCodes && !recoveryViewed && !showRecoveryCodes) {
      setShowRecoveryCodes(true)
      hideTimer = setTimeout(() => {
        setShowRecoveryCodes(false)
        updateRecoveryViewed()
      }, 60000)
    }

    return () => {
      if (hideTimer) {
        clearTimeout(hideTimer)
      }
    }
  }, [recoveryCodes, recoveryViewed, showRecoveryCodes, updateRecoveryViewed])

  const [isTwoFAEnabled, setIsTwoFAEnabled] = useState<boolean>(
    user?.isTwoFAEnabled ?? false
  )

  const handleToggle2FA = async (): Promise<void> => {
    if (!isTwoFAEnabled) {
      try {
        const response = await generate2FA()
        if (response.status === 'ok') {
          setQrCodeImage(response.image)
        } else {
          console.error('Failed to turn on 2FA:', response)
        }
      } catch (error) {
        console.error('Error turning on 2FA:', error)
      }
    }
  }

  const handle2FAToggleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isTwoFAEnabled) {
      setIsTwoFAEnabled(event.target.checked)
      handleToggle2FA()
    }
  }

  const handleSubmitCode = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const codeNoSpace = code.split(' ').join('')
      const response = await verify2FA({ code: codeNoSpace })
      if (response.status === 'ok' && response.secret) {
        updateRecoveryCodes([response.secret])
        setQrCodeImage(null)
        setCode('')
      } else {
        setVerificationError('Failed to verify 2FA code.')
      }
    } catch (error) {
      console.error('Error verifying 2FA code:', error)
      setVerificationError('An error occurred while verifying the 2FA code.')
    }
  }

  useEffect(() => {
    if (user) {
      setIsTwoFAEnabled(user.isTwoFAEnabled)
    }
  }, [user, user?.isTwoFAEnabled])

  return (
    <div>
      <h1>Security page</h1>
      {!qrCodeImage && (
        <label>
          <input
            type="checkbox"
            checked={isTwoFAEnabled}
            onChange={handle2FAToggleChange}
            disabled={isLoading || isTwoFAEnabled}
          />
          {isTwoFAEnabled ? '2FA Enabled' : 'Enable 2FA'}
        </label>
      )}
      {qrCodeImage && (
        <>
          <p>
            Open your Authenticator app, for example, Google Authenticator, DUO,
            Microsoft Security app, and scan the QR code:
          </p>
          <img src={qrCodeImage} alt="2FA QR Code" />
          <form onSubmit={handleSubmitCode}>
            <div>
              <label>
                Enter the code from your authenticator app:
                {''}
                <input
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  required
                />
              </label>
            </div>
            <button type="submit">Verify Code</button>
            {verificationError && (
              <p style={{ color: 'red' }}>{verificationError}</p>
            )}
          </form>
        </>
      )}
      {!recoveryViewed && recoveryCodes && (
        <div>
          <h2>Recovery Codes</h2>
          <p className="  text-red-500">
            Keep these codes in a safe place. You can use them to recover access
            to your account if you lose your 2FA device.
            <br />
            These will be available for one minute only.
          </p>
          <ul>
            {recoveryCodes.map((code, index) => (
              <li key={index}>{code}</li>
            ))}
          </ul>
          <div>
            <button onClick={updateRecoveryViewed}>
              I have saved my recovery codes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
