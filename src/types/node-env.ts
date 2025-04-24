import type { NODE_ENVS } from '../config/constants.js';

export type NodeEnv = (typeof NODE_ENVS)[keyof typeof NODE_ENVS];
