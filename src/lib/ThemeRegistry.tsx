'use client'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { buildTheme } from '@/lib/theme'
import { useAppStore } from '@/stores/useAppStore'

interface ThemeRegistryProps {
  readonly children: React.ReactNode
}

export const ThemeRegistry: React.FC<ThemeRegistryProps> = ({ children }) => {
  const mode = useAppStore((s) => s.theme)
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={buildTheme(mode)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
