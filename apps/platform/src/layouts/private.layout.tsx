import React, { FC } from 'react'
import useSession from '../hooks/useSession'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearAuthState, pages, useLogoutPerformForm } from '@isomera/impl'
import { LogoComponent } from '../components/common/logo.component'

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

export const PrivateLayout: FC<Props> = ({ children }) => {
  const { user, setUser } = useSession()
  const navigate = useNavigate()

  const onSuccess = (message: string) => {
    toast.success(message)
    setUser(undefined)
    clearAuthState()
    navigate(pages.login.path)
  }

  const onError = (message: string) => {
    toast.error(message)
  }

  const { handleClick } = useLogoutPerformForm(onSuccess, onError)

  return (
    <>
      <nav className="nav_top">
        <ul className="nav_left">
          <li className="nav_logo_wrapper">
            <Link to={pages.dashboard.path}>
              <LogoComponent />
            </Link>
          </li>
          <li>
            <Link to={pages.dashboard.path}>Home</Link>
          </li>
          <li>
            <Link to={pages.userInfo.path}>Profile</Link>
          </li>
        </ul>
        <div className="nav_right">
          <span>
            {user?.firstName} {user?.lastName}
          </span>
          <span>
            <button
              className="nav_logout_button"
              type="button"
              onClick={handleClick}
            >
              Logout
            </button>
          </span>
        </div>
      </nav>
      <main>{children}</main>
    </>
  )
}
