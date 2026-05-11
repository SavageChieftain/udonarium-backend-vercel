import { Hono } from 'hono';

import type { AppEnv } from '../../context';
import { skywayTokenRoute } from './skyway-token';
import { statusRoute } from './status';

export const v1Routes = new Hono<AppEnv>().route('/', statusRoute).route('/', skywayTokenRoute);
