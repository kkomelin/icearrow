import react from '@vitejs/plugin-react-swc';
import 'dotenv/config';
import { defineConfig, loadEnv, UserConfigExport } from 'vite';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  const config: UserConfigExport = {
    plugins: [react()],
    base: env.VITE_BASE_URL || '',
    build: {
      outDir: './build',
      sourcemap: env.NODE_ENV !== 'production',
    },
    server: {
      port: 3000,
    },
  };

  return config;
});
