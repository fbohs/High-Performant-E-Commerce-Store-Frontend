'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Alert, Button, TextField } from '@mui/material'
import { useAuthStore } from '@/stores/useAuthStore'
import { AuthError, signInRequest, signUpRequest } from '@/services/auth'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 8
const MAX_NAME_LENGTH = 100
const MAX_PHONE_LENGTH = 20
const MAX_PASSWORD_LENGTH = 128

export const SignUp: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const signIn = useAuthStore((s) => s.signIn)

  const [email, setEmail] = useState(searchParams.get('email') ?? '')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordDetails, setPasswordDetails] = useState<readonly string[]>([])
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)
    setEmailError(null)
    setPasswordError(null)
    setPasswordDetails([])

    const trimmedEmail = email.trim()
    let invalid = false
    if (!EMAIL_RE.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address.')
      invalid = true
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setPasswordError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`)
      invalid = true
    }
    if (invalid) return

    setSubmitting(true)
    try {
      await signUpRequest({
        email: trimmedEmail,
        password,
        name: name.trim() || undefined,
        phone: phone.trim() || undefined,
      })

      // Register endpoint returns no token, so chain a login to obtain one.
      try {
        const session = await signInRequest(trimmedEmail, password)
        signIn(session.user, session.token)
        router.push('/')
      } catch {
        router.push(`/sign-in?email=${encodeURIComponent(trimmedEmail)}`)
      }
    } catch (err) {
      if (err instanceof AuthError) {
        if (err.code === 'email_taken' || err.code === 'invalid_email_format') {
          setEmailError(err.message)
        } else if (err.code === 'weak_password') {
          setPasswordError(err.message)
          setPasswordDetails(err.details ?? [])
        } else {
          setFormError(err.message)
        }
      } else {
        setFormError('Could not create your account. Please try again.')
      }
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="sign-up-title"
      className="flex w-full flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <h1 id="sign-up-title" className="text-2xl font-semibold text-gray-900">
          Create account
        </h1>
        <p className="text-sm text-gray-600">
          Sign up with your email and a password to start shopping.
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
        slotProps={{ htmlInput: { maxLength: 254 } }}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value)
          if (passwordError) setPasswordError(null)
          if (passwordDetails.length) setPasswordDetails([])
        }}
        error={!!passwordError}
        helperText={passwordError ?? `At least ${MIN_PASSWORD_LENGTH} characters.`}
        autoComplete="new-password"
        required
        fullWidth
        slotProps={{ htmlInput: { maxLength: MAX_PASSWORD_LENGTH } }}
      />

      {passwordDetails.length > 0 && (
        <Alert severity="warning" role="alert">
          <ul className="ml-4 list-disc space-y-0.5">
            {passwordDetails.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Alert>
      )}

      <TextField
        label="Full name (optional)"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        autoComplete="name"
        fullWidth
        slotProps={{ htmlInput: { maxLength: MAX_NAME_LENGTH } }}
      />

      <TextField
        label="Phone (optional)"
        type="tel"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        autoComplete="tel"
        fullWidth
        slotProps={{ htmlInput: { maxLength: MAX_PHONE_LENGTH } }}
      />

      <Button type="submit" variant="contained" size="large" disabled={submitting}>
        {submitting ? 'Creating account…' : 'Create account'}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/sign-in" className="font-medium text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
