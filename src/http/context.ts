import type { AppConfig } from '../config/types';

export interface AppVariables {
  config: AppConfig;
}

export type AppEnv = { Variables: AppVariables };
