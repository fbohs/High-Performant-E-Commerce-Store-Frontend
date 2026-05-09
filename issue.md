consider snippet below from terminal
```
⨯ TypeError: Cannot read properties of undefined (reading 'hasHydrated')
    at <unknown> (src/components/RequireAuth/index.tsx:16:26)
    at RequireAuth (src/components/RequireAuth/index.tsx:15:43)
  14 |   const router = useRouter()
  15 |   const [hydrated, setHydrated] = useState<boolean>(() =>
> 16 |     useAuthStore.persist.hasHydrated(),
     |                          ^
  17 |   )
  18 |
  19 |   useEffect(() => { {
  digest: '568495462'
}
```