import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const toAccount = getBankAccount(0);
    expect(() => account.transfer(200, toAccount)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(() => account.transfer(50, account)).toThrow();
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const amount = 50;
    account.deposit(amount);
    expect(account.getBalance()).toBe(initialBalance + amount);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const amount = 50;
    account.withdraw(amount);
    expect(account.getBalance()).toBe(initialBalance - amount);
  });

  test('should transfer money', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const toAccount = getBankAccount(0);
    const amount = 50;
    account.transfer(amount, toAccount);
    expect(account.getBalance()).toBe(initialBalance - amount);
    expect(toAccount.getBalance()).toBe(amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValueOnce(150).mockReturnValueOnce(1);
    const account = getBankAccount(100);
    const balance = await account.fetchBalance();
    expect(balance).toBe(150);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock).mockReturnValueOnce(150).mockReturnValueOnce(1);
    const account = getBankAccount(100);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(150);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockReturnValueOnce(150).mockReturnValueOnce(0);
    const account = getBankAccount(100);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
