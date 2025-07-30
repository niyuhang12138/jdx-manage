/// <reference types="vite/client" />

interface ViteTypeOptions {
    strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_BASE_URL: string;
    readonly VITE_APP_TIMEOUT: number;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
