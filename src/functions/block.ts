import Transaction from '../types/transaction';
import Block from '../types/block';
import { createTransaction } from './transaction';
import { calculateHash, calculateHashRoot } from '../utils/hash';

const minerAddress = '0xf21e2784b5bDDCdFbAE812a0493e11b497eC5601';

interface ICreateBlock extends Omit<Block['header'], 'nonce' | 'rootHash'> {
  transactions: Transaction[];
}

export const buildBlock = ({
  previousHash,
  transactions,
  amountTransactions,
  id,
  timestamp,
}: ICreateBlock): Block => {
  const block = {
    hash: '',
    header: {
      previousHash,
      nonce: 0,
      rootHash: '',
      ...(id && { id }),
      ...(amountTransactions && { amountTransactions: amountTransactions + 1 }),
      ...(timestamp && { timestamp }),
    },
    body: {
      transactions: [
        createTransaction({
          reciver: minerAddress,
          amount: 6.25,
          coinbase: true,
        }),
        ...transactions,
      ],
    },
  } as Block;
  block.header.rootHash = calculateHashRoot(block.body.transactions);
  return block;
};

export const calculateBlockHash = ({
  rootHash,
  previousHash,
  nonce,
  id,
  amountTransactions,
  timestamp,
}: Block['header']): string => {
  const message =
    rootHash +
    previousHash +
    nonce.toString() +
    (id ?? '') +
    (amountTransactions?.toString() ?? '') +
    (timestamp?.toString() ?? '');
  return calculateHash(message);
};

export const mineBlock = (block: Block, difficult: number): void => {
  const { header } = block;
  while (!block.hash.startsWith('0'.repeat(difficult))) {
    header.nonce++;
    block.hash = calculateBlockHash(block.header);
  }
};
