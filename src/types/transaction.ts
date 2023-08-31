type Transaction = {
  coinbase?: boolean;
  sender?: string;
  reciver: string;
  amount: number;
  timestamp: number;
};

export default Transaction;
