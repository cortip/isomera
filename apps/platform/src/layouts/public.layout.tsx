import React, { FC } from 'react'

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

export const PublicLayout: FC<Props> = ({ children }) => {
  return (
    <div className="public_layout">
      <main>{children}</main>
    </div>
  )
}
