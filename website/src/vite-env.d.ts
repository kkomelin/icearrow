/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_FALLBACK_LANGUAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
