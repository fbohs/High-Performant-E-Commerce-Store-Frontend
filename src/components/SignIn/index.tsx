'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Alert, Button, TextField } from '@mui/material'
import { useAuthStore } from '@/stores/useAuthStore'
import { AuthError, signInRequest } from '@/services/auth'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const SignIn: React.FC = () => {
  const router = useRouter()
  const signIn = useAuthStore((s) => s.signIn)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)
    setEmailError(null)
    setPasswordError(null)

    const trimmedEmail = email.trim()
    let invalid = false
    if (!EMAIL_RE.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address.')
      invalid = true
    }
    if (password.length === 0) {
      setPasswordError('Password is required.')
      invalid = true
    }
    if (invalid) return

    setSubmitting(true)
    try {
      const result = await signInRequest(trimmedEmail, password)
      signIn(result.user, result.token)
      router.push('/')
    } catch (err) {
      if (err instanceof AuthError) {
        if (err.code === 'invalid_credentials') {
          setPasswordError(err.message)
        } else {
          setFormError(err.message)
        }
      } else {
        setFormError('Could not sign in. Please try again.')
      }
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="sign-in-title"
    // className="flex w-full flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <h1 id="sign-in-title" className="text-2xl font-semibold text-gray-900">
          Sign in
        </h1>
        <p className="text-sm text-gray-600">
          Enter your email and password to continue to ShopHub.
        </p>
      </div>

      {formError && (
        <Alert severity="error" role="alert">
          {formError}
        </Alert>
      )}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value)
          if (emailError) setEmailError(null)
        }}
        error={!!emailError}
        helperText={emailError ?? ' '}
        autoComplete="email"
        autoFocus
        required
        fullWidth
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value)
          if (passwordError) setPasswordError(null)
        }}
        error={!!passwordError}
        helperText={passwordError ?? ' '}
        autoComplete="current-password"
        required
        fullWidth
      />

      <Button type="submit" variant="contained" size="large" disabled={submitting}>
        {submitting ? 'Signing in…' : 'Continue'}
      </Button>

      <p className="text-center text-sm text-gray-600">
        New to ShopHub?{' '}
        <Link href="/sign-up" className="font-medium text-blue-600 hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  )
}
