import Transaction from './transaction';

type Block = {
  hash: string;
  header: {
    rootHash: string;
    previousHash: string;
    nonce: number;
    id?: string;
    timestamp?: number;
    amountTransactions?: number;
  };
  body: {
    transactions: Transaction[];
  };
};

export default Block;
