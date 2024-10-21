import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 3, b: 3, action: Action.Subtract, expected: 0 },
  { a: 2, b: 3, action: Action.Subtract, expected: -1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 3, b: 3, action: Action.Divide, expected: 1 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 4, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 3, action: 'somInvalid', expected: null },
  { a: 'two', b: 3, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$a $action $b should return $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
