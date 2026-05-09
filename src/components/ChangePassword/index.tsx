'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Alert, Button, TextField } from '@mui/material'
import { ApiError } from '@/services/api'
import { changePassword } from '@/services/profile'

const MIN_PASSWORD_LENGTH = 8
const MAX_PASSWORD_LENGTH = 128

export const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [currentError, setCurrentError] = useState<string | null>(null)
  const [newError, setNewError] = useState<string | null>(null)
  const [confirmError, setConfirmError] = useState<string | null>(null)
  const [details, setDetails] = useState<readonly string[]>([])
  const [formError, setFormError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setCurrentError(null)
    setNewError(null)
    setConfirmError(null)
    setDetails([])
    setFormError(null)
    setSuccess(false)

    let invalid = false
    if (currentPassword.length === 0) {
      setCurrentError('Current password is required.')
      invalid = true
    }
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setNewError(`New password must be at least ${MIN_PASSWORD_LENGTH} characters.`)
      invalid = true
    }
    if (newPassword !== confirmPassword) {
      setConfirmError('Passwords do not match.')
      invalid = true
    }
    if (invalid) return

    setSubmitting(true)
    try {
      await changePassword({ currentPassword, newPassword })
      setSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          setCurrentError(err.message)
        } else if (err.status === 400) {
          setNewError(err.message)
          setDetails(err.details ?? [])
        } else {
          setFormError(err.message)
        }
      } else {
        setFormError('Could not update your password. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="change-password-title"
      className="flex w-full flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <h1 id="change-password-title" className="text-2xl font-semibold text-gray-900">
          Change password
        </h1>
        <p className="text-sm text-gray-600">
          Choose a strong password you don&apos;t use elsewhere.
        </p>
      </div>

      {formError && <Alert severity="error">{formError}</Alert>}
      {success && <Alert severity="success">Password updated successfully.</Alert>}

      <TextField
        label="Current password"
        type="password"
        value={currentPassword}
        onChange={(event) => {
          setCurrentPassword(event.target.value)
          if (currentError) setCurrentError(null)
        }}
        error={!!currentError}
        helperText={currentError ?? ' '}
        autoComplete="current-password"
        autoFocus
        required
        fullWidth
      />

      <TextField
        label="New password"
        type="password"
        value={newPassword}
        onChange={(event) => {
          setNewPassword(event.target.value)
          if (newError) setNewError(null)
          if (details.length) setDetails([])
        }}
        error={!!newError}
        helperText={newError ?? `At least ${MIN_PASSWORD_LENGTH} characters.`}
        autoComplete="new-password"
        required
        fullWidth
        slotProps={{ htmlInput: { maxLength: MAX_PASSWORD_LENGTH } }}
      />

      {details.length > 0 && (
        <Alert severity="warning">
          <ul className="ml-4 list-disc space-y-0.5">
            {details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Alert>
      )}

      <TextField
        label="Confirm new password"
        type="password"
        value={confirmPassword}
        onChange={(event) => {
          setConfirmPassword(event.target.value)
          if (confirmError) setConfirmError(null)
        }}
        error={!!confirmError}
        helperText={confirmError ?? ' '}
        autoComplete="new-password"
        required
        fullWidth
        slotProps={{ htmlInput: { maxLength: MAX_PASSWORD_LENGTH } }}
      />

      <div className="flex items-center justify-between gap-3">
        <Link
          href="/account/profile"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Back to profile
        </Link>
        <Button type="submit" variant="contained" disabled={submitting}>
          {submitting ? 'Updating…' : 'Update password'}
        </Button>
      </div>
    </form>
  )
}
