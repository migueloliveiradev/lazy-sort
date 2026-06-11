import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { sort } from './sort.js';

describe('lazy-sort', () => {
  it('should return an empty array when given an empty array', async (t) => {
    t.mock.timers.enable({ apis: ['setTimeout'] });

    const promise = sort([], 'age' as any);
    t.mock.timers.tick(9999999);

    const result = await promise;

    assert.deepEqual(result, []);
  });

  it('should sort an array of objects by a numeric property', async (t) => {
    t.mock.timers.enable({ apis: ['setTimeout'] });

    const data = [
      { name: 'Carlos', age: 300 },
      { name: 'Ana', age: 10 },
      { name: 'Bruno', age: 50 }
    ];

    const promise = sort(data, 'age');
    t.mock.timers.tick(9999999);

    const result = await promise;

    assert.deepEqual(result, [
      { name: 'Ana', age: 10 },
      { name: 'Bruno', age: 50 },
      { name: 'Carlos', age: 300 }
    ]);
  });

  it('should sort by nested properties', async (t) => {
    t.mock.timers.enable({ apis: ['setTimeout'] });

    const data = [
      { user: { level: 99 } },
      { user: { level: 1 } },
      { user: { level: 50 } }
    ];

    const promise = sort(data, 'user.level');
    t.mock.timers.tick(9999999);

    const result = await promise;

    assert.deepEqual(result, [
      { user: { level: 1 } },
      { user: { level: 50 } },
      { user: { level: 99 } }
    ]);
  });

  it('should sort alphabetically using string properties', async (t) => {
    t.mock.timers.enable({ apis: ['setTimeout'] });

    const data = [
      { name: 'Zebra' },
      { name: 'Abelha' },
      { name: 'Macaco' }
    ];

    const promise = sort(data, 'name');
    t.mock.timers.tick(9999999);

    const result = await promise;

    assert.deepEqual(result, [
      { name: 'Abelha' },
      { name: 'Macaco' },
      { name: 'Zebra' }
    ]);
  });

  it('should sort by name and sub-sort by createdAt ISO date', async (t) => {
    t.mock.timers.enable({ apis: ['setTimeout'] });

    const data = [
      { name: 'Charlie', createdAt: '2024-03-15T08:00:00.000Z' },
      { name: 'Alice', createdAt: '2024-01-20T14:30:00.000Z' },
      { name: 'Alice', createdAt: '2023-11-10T09:15:00.000Z' },
      { name: 'Bob', createdAt: '2024-02-05T18:45:00.000Z' }
    ];

    const promise = sort(data, 'name', 'createdAt');
    t.mock.timers.tick(9999999);

    const result = await promise;

    assert.deepEqual(result, [
      { name: 'Alice', createdAt: '2023-11-10T09:15:00.000Z' },
      { name: 'Alice', createdAt: '2024-01-20T14:30:00.000Z' },
      { name: 'Bob', createdAt: '2024-02-05T18:45:00.000Z' },
      { name: 'Charlie', createdAt: '2024-03-15T08:00:00.000Z' }
    ]);
  });
});