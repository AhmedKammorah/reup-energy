import * as migration_20260516_123238_initial from './20260516_123238_initial';

export const migrations = [
  {
    up: migration_20260516_123238_initial.up,
    down: migration_20260516_123238_initial.down,
    name: '20260516_123238_initial'
  },
];
