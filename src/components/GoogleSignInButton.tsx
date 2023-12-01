import React, { FC, ReactNode } from 'react'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

interface GoogleSignInButton {
    children: ReactNode
}

const GoogleSignInButton:FC<GoogleSignInButton> = ({children}) => {
    const loginWithGoogle = () => signIn('google', {callbackUrl: 'http://localhost:3000/dashboard'})
  return (
    <Button onClick={loginWithGoogle} className="w-full">{children}</Button>
  )
}

export default GoogleSignInButton