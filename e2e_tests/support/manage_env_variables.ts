import fs from 'fs';
import path from 'node:path';
import dotenv from 'dotenv';

export type EnvSource = 'cli' | 'file' | 'file1';

export function loadEnvWithPreference(envFilePath: string): {
  source: EnvSource;
} {
  // detect explicit preference from env var
  const preferFromEnv =
    (process.env['PREFER_ENV_SOURCE'] as EnvSource) || undefined;

  const preferred = preferFromEnv ?? 'file';

  if (preferred === 'cli') {
    const hasAnyEnv = Object.keys(process.env).length > 0;

    if (!hasAnyEnv && envFilePath) {
      dotenv.config({ path: envFilePath });
      return { source: 'file1' };
    }
    return { source: 'cli' };
  }

  // preferred === 'file'
  if (!fs.existsSync(envFilePath)) {
    return { source: 'cli' };
  }
  dotenv.config({ path: envFilePath });
  return { source: 'file' };

  // const envFilePathfilePathToUse = envFilePath ?? path.resolve(process.cwd(), '.env');
  // const loaded = loadDotEnv(filePathToUse);
  // return { source: loaded ? 'file' : 'none' };
}

export default loadEnvWithPreference;
