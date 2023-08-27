import Transaction from '../types/transaction';
import { calculateHash } from '../utils/hash';

interface ICreateTransaction extends Omit<Transaction, 'timestamp'> {
  coinbase: boolean;
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
  if (!coinbase) {
    if (!sender) throw new Error('Sender is required');
    transaction.sender = sender;
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
