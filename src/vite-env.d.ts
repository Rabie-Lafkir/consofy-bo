/// <reference types="vite/client" />

// ---------------------------------------------------------------------------
// Custom environment variable typings
// ---------------------------------------------------------------------------
interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_API_URL: string
  // add more variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
