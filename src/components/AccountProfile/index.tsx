'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Alert, Button, CircularProgress, TextField } from '@mui/material'
import { useAuthStore } from '@/stores/useAuthStore'
import { ApiError } from '@/services/api'
import { getProfile, updateProfile, type ProfileUser } from '@/services/profile'

const MAX_NAME_LENGTH = 100
const MAX_PHONE_LENGTH = 20

type Mode = 'view' | 'edit' | 'saving'

export const AccountProfile: React.FC = () => {
  const replaceUser = useAuthStore((s) => s.signIn)
  const token = useAuthStore((s) => s.token)

  const [profile, setProfile] = useState<ProfileUser | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [mode, setMode] = useState<Mode>('view')
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setLoadError(null)
    getProfile()
      .then((p) => {
        if (cancelled) return
        setProfile(p)
        setName(p.name ?? '')
        setPhone(p.phone ?? '')
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setLoadError(err instanceof ApiError ? err.message : 'Could not load your profile.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const onEdit = () => {
    setSaveError(null)
    setSavedAt(null)
    setMode('edit')
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!token) return
    setMode('saving')
    setSaveError(null)
    setSavedAt(null)
    try {
      const trimmedName = name.trim()
      const trimmedPhone = phone.trim()
      const updated = await updateProfile({
        name: trimmedName,
        phone: trimmedPhone,
      })
      setProfile(updated)
      setName(updated.name ?? '')
      setPhone(updated.phone ?? '')
      replaceUser(
        {
          id: updated.id,
          email: updated.email,
          name: updated.name?.trim() ? updated.name : updated.email.split('@')[0],
        },
        token,
      )
      setSavedAt(Date.now())
      setMode('view')
    } catch (err) {
      setSaveError(err instanceof ApiError ? err.message : 'Could not save changes.')
      setMode('edit')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <CircularProgress aria-label="Loading profile" />
      </div>
    )
  }

  if (loadError) {
    return <Alert severity="error">{loadError}</Alert>
  }

  const inputsDisabled = mode !== 'edit'
  const saving = mode === 'saving'

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="profile-title"
      className="flex w-full flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <h1 id="profile-title" className="text-2xl font-semibold text-gray-900">
          Account
        </h1>
        <p className="text-sm text-gray-600">
          Your personal information.
        </p>
      </div>

      {saveError && <Alert severity="error">{saveError}</Alert>}
      {savedAt && <Alert severity="success">Profile updated.</Alert>}

      <TextField
        label="Email"
        value={profile?.email ?? ''}
        disabled
        helperText="Email cannot be changed here."
        fullWidth
      />

      <TextField
        label="Full name (optional)"
        value={name}
        onChange={(event) => setName(event.target.value)}
        disabled={inputsDisabled}
        autoComplete="name"
        fullWidth
        slotProps={{ htmlInput: { maxLength: MAX_NAME_LENGTH } }}
      />

      <TextField
        label="Phone (optional)"
        type="tel"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        disabled={inputsDisabled}
        autoComplete="tel"
        fullWidth
        slotProps={{ htmlInput: { maxLength: MAX_PHONE_LENGTH } }}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/account/change-password"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Change password
        </Link>
        {mode === 'view' ? (
          <Button type="button" variant="contained" onClick={onEdit}>
            Edit
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            disabled={saving}
            startIcon={saving ? <CircularProgress size={16} color="inherit" /> : undefined}
          >
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        )}
      </div>
    </form>
  )
}
