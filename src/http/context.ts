import type { AppConfig } from '../config/types';

export interface AppVariables {
  config: AppConfig;
}

export interface AppEnv {
  Variables: AppVariables;
}
