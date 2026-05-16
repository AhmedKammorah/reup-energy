import * as migration_20260515_201950 from './20260515_201950';

export const migrations = [
  {
    up: migration_20260515_201950.up,
    down: migration_20260515_201950.down,
    name: '20260515_201950'
  },
];
