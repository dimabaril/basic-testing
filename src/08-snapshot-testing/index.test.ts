import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([1])).toStrictEqual({
      value: 1,
      next: { value: null, next: null },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([1, 2])).toStrictEqual({
      value: 1,
      next: { value: 2, next: { value: null, next: null } },
    });
  });
});
