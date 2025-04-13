import type { Info } from './info.js';

export interface MultiError extends Info {
  errors: string[];
}
