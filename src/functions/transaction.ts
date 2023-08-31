import Transaction from '../types/transaction';
import { calculateHash } from '../utils/hash';
import {
  adjustBalance,
  checkWallet,
  checkWalletBalance,
} from '../utils/wallets';

interface ICreateTransaction extends Omit<Transaction, 'timestamp'> {
  coinbase?: boolean;
}

export const createTransaction = ({
  sender,
  reciver,
  amount,
  coinbase = false,
}: ICreateTransaction): Transaction => {
  const transaction = {
    timestamp: Date.now(),
    reciver,
    amount,
  } as Transaction;
  if (coinbase) {
    transaction.coinbase = true;
  } else {
    if (!sender) throw new Error('Sender is required');
    transaction.sender = sender;
  }
  validateTransaction(transaction);
  if (!coinbase) {
    adjustBalance(transaction.sender, -transaction.amount);
    adjustBalance(transaction.reciver, transaction.amount);
  }
  return transaction;
};

export const calculateTransactionHash = (transaction: Transaction): string => {
  const message =
    (transaction.sender ?? '') +
    transaction.reciver +
    transaction.amount.toString() +
    transaction.timestamp.toString();
  return calculateHash(message);
};

const validateTransaction = (transaction: Transaction): void => {
  if (transaction.sender === transaction.reciver || transaction.amount <= 0)
    throw new Error('Invalid transaction');
  if (transaction.sender)
    checkWalletBalance(transaction.sender, transaction.amount);
  checkWallet(transaction.reciver);
};
